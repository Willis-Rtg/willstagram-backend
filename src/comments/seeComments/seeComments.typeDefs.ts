import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeComments(photoId: Int!): [Comment]
  }
`;
