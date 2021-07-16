import { Resolvers } from "../types";

const CommentsResolvers: Resolvers = {
  Comment: {
    isMine: ({ user }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return user.id === loggedInUser.id;
    },
    user: ({ id }, _, { client }) =>
      client.comment.findUnique({ where: { id } }).user(),
  },
};

export default CommentsResolvers;
