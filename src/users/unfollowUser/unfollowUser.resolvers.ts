import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const Resolvers: Resolvers = {
  Mutation: {
    unfollow: protectResolver(
      async (_, { toUnfollow }, { client, loggedInUser }) => {
        const check = await client.user.findUnique({
          where: { username: toUnfollow },
        });
        if (!check)
          return { ok: false, error: "The username to unfollow isn't exist." };
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { username: toUnfollow } } },
        });
        if (updatedUser) return { ok: true };
      }
    ),
  },
};

export default Resolvers;
