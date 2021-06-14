import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) => {
      return client.hashtag.findUnique({ where: { hashtag } });
    },
  },
};

export default Resolvers;
