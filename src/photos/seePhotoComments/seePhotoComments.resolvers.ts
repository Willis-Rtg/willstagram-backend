import { Resolvers } from "../../types";

const seePhotoCommentsResolvers: Resolvers = {
  Query: {
    seePhotoComments: (_, { photoId, page = 1 }, { client }) =>
      client.comment.findMany({
        where: { photoId },
        orderBy: { createdAt: "desc" },
        take: 50,
        skip: 50 * (page - 1),
      }) ,
  },
};

export default seePhotoCommentsResolvers;
