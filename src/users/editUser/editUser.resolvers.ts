import client from "../../client";
import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { createWriteStream } from "fs";
import { Resolver, Resolvers } from "../../types";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverfn: Resolver = async (
  _,
  { firstName, lastName, username, email, password, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
    /* const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      `${process.cwd()}/uploads/${newFilename}`
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`; */
  }

  let uglypassword = null;
  if (password) uglypassword = bcrypt.hashSync(password, 10);

  const updateOk = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglypassword && { password: uglypassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updateOk) return { ok: true };
  else return { ok: false, error: "Could not update profile" };
};

const Resolvers: Resolvers = {
  Mutation: {
    editUser: protectResolver(resolverfn),
  },
};

export default Resolvers;
