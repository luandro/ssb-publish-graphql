const DefaultMessage = require('./default/type')
const PostMessage = require('./post/type')
// TODO:
// hasBlob
// isFollowing
// isBlocking
// unboxPrivate

const Message = `
  input publishInput {
    content: String
    type: String!
  }
  interface Message {
    key: ID
    sequence: Int
    timestamp: Float
    type: String
    author: String
  }
`

const Query = `
  type Query {
    default: Boolean
  }
`

const Mutation = `
  type Mutation {
    publish(input: publishInput): DefaultMessage
    publishPrivate(content: String recipients: [String]): DefaultMessage
    publishPost(text: String! channel: String): PostMessage
    publishPrivatePost(text: String recipients: [String]): DefaultMessage
  }
`

const Schema = () => [`
  schema {
    query: Query
    mutation: Mutation
  }
`]

module.exports = [
  Schema,
  Query,
  Mutation,
  DefaultMessage,
  PostMessage,
  Message,
]