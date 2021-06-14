import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }, { client }) => {
      return client.photo.findUnique({ where: { id } });
    },
  },
};

export default Resolvers;
