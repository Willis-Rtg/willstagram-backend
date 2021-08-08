import { gql } from "apollo-server-core";

export default gql`
  type createCommentResult {
    ok: Boolean!
    error: String
    id: Int
  }
  type Mutation {
    createComment(photoId: Int!, payload: String!): createCommentResult!
  }
`;
