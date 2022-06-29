import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        user {
         _id
         username
         email
         bookCount
         savedBooks{
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