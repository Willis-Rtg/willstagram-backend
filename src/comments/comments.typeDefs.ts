// import { gql } from "@apollo/client";
import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: ID!
    userId: ID
    photoId: ID!
    payload: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
