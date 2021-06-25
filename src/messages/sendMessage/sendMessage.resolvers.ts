import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const sendMessageResolvers: Resolvers = {
  Mutation: {
    sendMessage: protectResolver(
      async (_, { payload, roomId, userId }, { client, loggedInUser }) => {
        let room;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) return { ok: false, error: "This user doese not exist" };
          if (!roomId) {
            room = await client.room.create({
              data: {
                users: { connect: [{ id: userId }, { id: loggedInUser.id }] },
              },
            });
          }
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) return { ok: false, error: "Room not found" };
        } else {
          return { ok: false, error: "Can not send message" };
        }
        const message = await client.message.create({
          data: {
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser.id } },
            payload,
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: message });
        return { ok: true };
      }
    ),
  },
};

export default sendMessageResolvers;
