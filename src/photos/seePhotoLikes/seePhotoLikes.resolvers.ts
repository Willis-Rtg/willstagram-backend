import { Resolvers } from "../../types";

const SeePhotoLikesResolver: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client }) => {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });
      return likes.map((like) => like.user);
    },
  },
};

export default SeePhotoLikesResolver;
