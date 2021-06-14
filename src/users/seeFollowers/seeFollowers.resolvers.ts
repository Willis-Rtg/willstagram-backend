import { Resolvers } from "../../types";

const seeFollowers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      const check = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!check) return { ok: false, error: "User not found" };
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ skip: (page - 1) * 5, take: 5 });
      const totalFollwers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollwers / 5),
      };
    },
  },
};

export default seeFollowers;
