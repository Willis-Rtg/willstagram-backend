import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const Resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ email }, { username }] },
        });
        if (existingUser)
          return { ok: false, error: "This username/email is already taken" };

        const uglypassword = bcrypt.hashSync(password, 10);
        const newUser = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglypassword,
          },
        });
        if (newUser) return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default Resolvers;
