import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const deleteCommentResolvers: Resolvers = {
  Mutation: {
    deleteComment: protectResolver(
      async (_, { commentId }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id: commentId },
          select: { userId: true },
        });
        if (!comment) return { ok: false, error: "Not found comment" };
        if (comment.userId !== loggedInUser.id)
          return { ok: false, error: "Not authorized" };
        else {
          await client.comment.delete({ where: { id: commentId } });
          return { ok: true };
        }
      }
    ),
  },
};

export default deleteCommentResolvers;
