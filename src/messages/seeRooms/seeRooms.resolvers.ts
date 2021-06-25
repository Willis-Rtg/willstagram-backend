import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const seeRoomsResolvers: Resolvers = {
  Query: {
    seeRooms: protectResolver((_, __, { client, loggedInUser }) =>
      client.room.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};

export default seeRoomsResolvers;
