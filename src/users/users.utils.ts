import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const verifiedToeken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToeken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToeken.id },
      });
      if (user) return user;
    } else return null;
  } catch {
    return null;
  }
};

export function protectResolver(ourResolver: Resolver) {
  return function (root, args, context, info) {
    console.log(info);
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else
        return {
          ok: false,
          error: "Please log in for this action.",
        };
    }
    return ourResolver(root, args, context, info);
  };
}
