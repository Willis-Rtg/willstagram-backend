import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }, { client }) => {
      const check = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!check) return { ok: false, error: "User not found" };
      const following = await client.user
        .findUnique({ where: username })
        .following({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return { ok: true, following };
    },
  },
};

export default Resolvers;
