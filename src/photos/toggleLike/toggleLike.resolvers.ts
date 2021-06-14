import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const Resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectResolver(async (_, { id }, { loggedInUser, client }) => {
      const existPhoto = await client.photo.findUnique({ where: { id } });
      if (!existPhoto) return { ok: false, error: "Photo not found" };
      const like = await client.like.findUnique({
        where: { photoId_userId: { userId: loggedInUser.id, photoId: id } },
      });
      if (like) await client.like.delete({ where: { id: like.id } });
      else
        await client.like.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id } },
          },
        });
      return { ok: true };
    }),
  },
};

export default Resolvers;
