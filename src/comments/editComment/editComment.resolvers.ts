import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const editCommentResolvers: Resolvers = {
  Mutation: {
    editComment: protectResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) return { ok: false, error: "Not found comment" };
        else if (comment.userId !== loggedInUser.id)
          return { ok: false, error: "Not authorized" };
        else {
          await client.comment.update({ where: { id }, data: { payload } });
          return { ok: true };
        }
      }
    ),
  },
};

export default editCommentResolvers;
