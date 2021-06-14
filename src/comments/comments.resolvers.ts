import { Resolvers } from "../types";

const CommentsResolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
  },
};

export default CommentsResolvers;
