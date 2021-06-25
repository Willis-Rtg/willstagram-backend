import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

const Resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        let hashtagOgjs = [];
        if (caption) {
          hashtagOgjs = processHashtag(caption);
        }
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagOgjs.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagOgjs,
              },
            }),
          },
        });
      }
    ),
  },
};

export default Resolvers;
