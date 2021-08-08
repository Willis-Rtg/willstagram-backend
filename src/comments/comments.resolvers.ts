import { Resolvers } from "../types";

const CommentsResolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
    user: ({ id }, _, { client }) =>
      client.comment.findUnique({ where: { id } }).user(),
  },
};

export default CommentsResolvers;
