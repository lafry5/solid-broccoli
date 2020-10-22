import gql from "graphql-tag";
//This is on the front end!!!

// The stuff you need to use on the Front End

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;