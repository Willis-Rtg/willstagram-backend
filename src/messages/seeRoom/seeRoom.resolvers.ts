import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const seeRoomResolvers: Resolvers = {
  Query: {
    seeRoom: protectResolver(async (_, { id }, { client, loggedInUser }) => {
      const room = await client.room.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      });
      return room;
    }),
  },
};

export default seeRoomResolvers;
