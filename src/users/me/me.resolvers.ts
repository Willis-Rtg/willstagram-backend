import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const meResolver: Resolvers = {
  Query: {
    me: protectResolver((_, __, { loggedInUser, client }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};

export default meResolver;
