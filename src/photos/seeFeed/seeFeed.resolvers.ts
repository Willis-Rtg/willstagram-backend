import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const seeFeedResolvers: Resolvers = {
  Query: {
    seeFeed: protectResolver((_, __, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};

export default seeFeedResolvers;
