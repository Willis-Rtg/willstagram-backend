import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) => {
      try {
        return client.user.findUnique({
          where: { username },
          include: { following: true, followers: true },
        });
      } catch (error) {
        return error;
      }
    },
  },
};

export default Resolvers;
