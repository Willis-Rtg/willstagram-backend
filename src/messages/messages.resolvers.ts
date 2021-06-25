import { Resolvers } from "../types";
import { protectResolver } from "../users/users.utils";

const roomResolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: protectResolver(({ id }, _, { client, loggedInUser }) =>
      client.message.count({
        where: { read: false, roomId: id, userId: { not: loggedInUser.id } },
      })
    ),
  },
  Message: {
    user: ({ id }, _, { client }) =>
      client.message.findUnique({ where: { id } }).user(),
  },
};

export default roomResolvers;
