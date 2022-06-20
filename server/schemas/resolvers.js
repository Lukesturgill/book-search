const { AuthenticationError } = require('apollo-server-express');
const { sign } = require('jsonwebtoken');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ email: context.user.email })
                .select('-__v -password');
                console.log(userData);
              return userData;
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("Incorrect email/ password.");
            }
            const authPassword = await user.isCorrectPassword(password);
            if (!authPassword) {
                throw new AuthenticationError("incorrect email/ password.");
            }
            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
    },
};

  module.exports = resolvers;