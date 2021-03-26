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
          await client.user.update({
            where: { id: loggedInUser.id },
            data: { following: { connect: { username: toFollow } } },
          });
          return { ok: true };
        } catch {}
      }
    ),
  },
};

export default Resolvers;
