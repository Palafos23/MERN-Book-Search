const typeDefs = `
type Query {
    me: [User]!
}
// still need to create an input type to handle all parameters 
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
}

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: id!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
}

type Auth {
    token: ID!
    user: [User]!
}
`