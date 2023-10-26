const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({})
        },
    },
    Mutation: {
        login: async (parent, args) => {
            const book = await User.findOneAndUpdate();
            return book;
          },
        addUser: async (parent, args) => {
            const book = await User.findOneAndUpdate();
            return book;
          },  
        saveBook: async (parent, args) => {
            const book = await User.findOneAndUpdate();
            return book;
          },
        deleteBook: async (parent, {}) => {
            const book = await User.findOneAndUpdate(
             
            );
            return book;
          },
    }
}