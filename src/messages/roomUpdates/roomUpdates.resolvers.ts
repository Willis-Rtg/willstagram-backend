import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import client from "../../client";

const roomUpdatesResolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        if (!room) throw new Error("You shall not see this");
        return withFilter(
          () => pubsub.asyncIterator([NEW_MESSAGE]),
          async (payload, { id }, { loggedInUser }) => {
            if (payload.roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: { id, users: { some: { id: loggedInUser.id } } },
                select: { id: true },
              });
            }
            if (!room) return false;
            return true;
          }
        )(root, args, context, info);
      },
    },
  },
};

export default roomUpdatesResolvers;
