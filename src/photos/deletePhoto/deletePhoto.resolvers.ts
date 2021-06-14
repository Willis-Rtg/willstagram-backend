import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const deletePhotoResolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectResolver(
      async (_, { photoId }, { client, loggedInUser }) => {
        try {
          const photo = await client.photo.findFirst({
            where: { id: photoId, userId: loggedInUser.id },
          });
          if (photo) {
            await client.photo.delete({ where: { id: photoId } });
            return { ok: true };
          } else {
            return { ok: false, error: "Photo not found or Not authorized" };
          }
        } catch (e) {
          return { ok: false, error: e.maessage };
        }
      }
    ),
  },
};

export default deletePhotoResolvers;
