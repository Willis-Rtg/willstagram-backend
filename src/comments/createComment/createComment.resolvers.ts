import e = require("express");
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
        if (!ok) return { ok: false, error: "Photo not found" };
        try {
          await client.comment.create({
            data: {
              payload,
              photo: { connect: { id: photoId } },
              user: { connect: { id: loggedInUser.id } },
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      }
    ),
  },
};

export default createCommentResolvers;
