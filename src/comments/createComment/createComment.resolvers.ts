import { processHashtag } from "../../photos/photos.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const createCommentResolvers: Resolvers = {
  Mutation: {
    createComment: protectResolver(
      async (_, { photoId, payload }, { client, loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        const hashtag = processHashtag(payload);

        if (!ok) return { ok: false, error: "Photo not found" };
        try {
          const newComment = await client.comment.create({
            data: {
              payload,
              photo: { connect: { id: photoId } },
              user: { connect: { id: loggedInUser.id } },
              hashtags: {
                connectOrCreate: hashtag,
              },
            },
          });
          return { ok: true, id: newComment.id };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      }
    ),
  },
};

export default createCommentResolvers;
