const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const user = await User.FindOne({_id: context.user._id}).select('-__v -password')
            .populate('savedBooks');

            return user;
          }
          throw AuthenticationError;
    },
},
    Mutation: {
        login: async (parent, { email, password }) => {

            const user = await User.FindOne({email});
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            
            const token = signToken(user);
             return { token, user };
          },  
        saveBook: async (parent, {authors, description, title, bookId, image, link}, context) => {
          if (context.user) {
            const savedBooksForUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: {savedBooks: {authors, description, title, bookId, image, link}}},
              {new: true, runValidators: true}
              );
    
            return savedBooksForUser;
          }
          throw AuthenticationError;
          },
        deleteBook: async (parent, {bookId}, context) => {
          if (context.user) {
            const deletedBooksForUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: {savedBooks: {bookId}}},
              {new: true, runValidators: true}
              );
    
            return deletedBooksForUser;
          }
          throw AuthenticationError;
          },
    }
}

module.exports = resolvers;