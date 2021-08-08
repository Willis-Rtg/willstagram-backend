import { Resolvers } from "../types";

const Resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),
    likeCount: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
    likes: ({ id }, _, { client }) =>
      client.like.findMany({ where: { photoId: id } }),
    comments: ({ id }, _, { client }) =>
      client.comment.findMany({ where: { photo: { id } } }),
    commentsCount: ({ id }, _, { client }) =>
      client.comment.count({ where: { photo: { id } } }),
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
      });
      if (!like) return false;
      return true;
    },
  },
  Hashtag: {
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
    photos: ({ id }, { page }, { client }) => {
      return client.hashtag.findUnique({ where: { id } }).photos();
    },
  },
};

export default Resolvers;
