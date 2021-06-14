import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

const Resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtags: { select: { hashtag: true } } },
        });

        if (!oldPhoto) return { ok: false, error: "Photo not found." };
        let hashtabObj = processHashtag(caption);
        const photo = await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: hashtabObj,
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default Resolvers;
