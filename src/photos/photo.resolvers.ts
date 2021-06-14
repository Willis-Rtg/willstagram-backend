import { Resolvers } from "../types";

const Resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
    comments: ({ id }, _, { client }) =>
      client.comment.count({ where: { photo: { id } } }),
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
    photos: ({ id }, { page }, { client }) => {
      console.log("🚀 ~ file: photo.resolvers.ts ~ line 16 ~ args", page);
      return client.hashtag.findUnique({ where: { id } }).photos();
    },
  },
};

export default Resolvers;
