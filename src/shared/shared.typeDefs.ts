import { gql } from "apollo-server-core";

export default gql`
  type   {
    ok: Boolean!
    error: String
  }
`;
