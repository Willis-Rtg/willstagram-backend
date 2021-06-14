import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const Resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(
      async (_, { toFollow }, { client, loggedInUser }) => {
        try {
          const check = await client.user.findUnique({
            where: { username: toFollow },
          });
          if (!check) return { ok: false, error: "The user is not exist." };

          // const followings = await client.user
          //   .findUnique({ where: { id: loggedInUser.id } })
          //   .following();
          // const following = followings.find(
          //   (following) => following.username === toFollow
          // );
          // if (following) {
          //   await client.user.update({
          //     where: { id: loggedInUser.id },
          //     data: { following: { disconnect: { username: toFollow } } },
          //   });
          //   return { ok: true };
          // }

          await client.user.update({
            where: { id: loggedInUser.id },
            data: { following: { connect: { username: toFollow } } },
          });
          return { ok: true };
        } catch (error) {
          console.log("🚀 ~followUser.resolvers.ts error", error);
        }
      }
    ),
  },
};

export default Resolvers;
