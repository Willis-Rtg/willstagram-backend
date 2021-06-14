import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Query: {
    searchPhotos: (_, { keyword, page = 1 }, { client }) => {
      return client.photo.findMany({
        where: { caption: { startsWith: keyword } },
        skip: (page - 1) * 10,
        take: 10,
      });
    },
  },
};

export default Resolvers;
