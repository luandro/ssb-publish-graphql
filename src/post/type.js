const PostMessage = `
  type Mention {
    link: String!
    rel: String
    name: String
    type: String
    size: Int
  }
  type Reply {
    from: String!
    to: String!
  }
  type PostContent {
    type: String
    text: String
  }
  type PostMessage implements Message {
    content: PostContent
    key: ID
    sequence: Int
    text: String
    timestamp: Float
    type: String
    author: String
    root: String
    branch: [String]
    reply: [Reply]
    revisionRoot: String
    revisionBranch: String
    mentions: [Mention]
    channel: String
  }
`
module.exports = () => [PostMessage]
