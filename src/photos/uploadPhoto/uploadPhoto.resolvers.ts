import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

const Resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        console.log("🚀 ~ file: uploadPhoto.resolvers.ts ~ line 8 ~ caption");
        let hashtagOgjs = [];
        if (caption) {
          hashtagOgjs = processHashtag(caption);
        }
        return client.photo.create({
          data: {
            file,
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
