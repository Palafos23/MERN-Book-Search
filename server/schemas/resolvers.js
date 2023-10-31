const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            const user = await User.FindOne();
            return user;
          },
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.FindOne();
            return user;
          },
        addUser: async (parent, args) => {
            const newUser = await User.create();
            return newUser;
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