// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book{
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    input bookInput{
        description: String
        title: String
        bookId: String
        image: String
        link: String
        authors: [String]
    }

    type Query{
        user: User
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(input: bookInput): User
        removeBook(userId: ID!, bookId: String!): User
    }

    type Auth {
        token: ID!
        user: User
      }
`;

// export the typeDefs
module.exports = typeDefs;