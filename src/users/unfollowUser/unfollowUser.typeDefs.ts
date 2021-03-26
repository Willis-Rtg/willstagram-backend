import { gql } from "apollo-server-core";

export default gql`
  type UnfollowUserResult {
    ok: Boolean
    error: String
  }
  type Mutation {
    unfollow(toUnfollow: String): UnfollowUserResult
  }
`;
