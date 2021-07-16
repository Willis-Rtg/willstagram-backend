import client from "../../client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User not fount" };

      const passwordOk = await bcrypt.compareSync(password, user.password);
      if (!passwordOk) return { ok: false, error: "Wrong password" };

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "7 days",
      });
      return {
        ok: true,
        token,
      };
    },
  },
};

export default Resolvers;
