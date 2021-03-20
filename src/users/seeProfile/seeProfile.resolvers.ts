import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) => {
      try {
        return client.user.findUnique({ where: { username } });
      } catch (error) {
        return error;
      }
    },
  },
};

export default Resolvers;
