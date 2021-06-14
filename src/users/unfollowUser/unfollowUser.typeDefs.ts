import { gql } from "apollo-server-core";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollow(toUnfollow: String): MutationResponse
  }
`;
