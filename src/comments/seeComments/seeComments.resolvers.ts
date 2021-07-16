import { Resolvers } from "../../types";

const seeCommentsResolver: Resolvers = {
  Query: {
    seeComments: async (_, { photoId }, { client }) => {
      const comments = await client.comment.findMany({ where: { photoId } });
      return comments;
    },
  },
};

export default seeCommentsResolver;
