import { Resolvers } from "../types";

const Resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) return false;
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      const check = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
      });
      return Boolean(check);
    },
    photos: ({ id }, { lastId }, { client }) => {
      return client.user
        .findUnique({ where: { id } })
        .photos({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
  },
};

export default Resolvers;
