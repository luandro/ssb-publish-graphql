const ChannelMessage = `
  type ChannelMessage {
    channel: String!
    content: String
    key: String!
    sequence: Int!
    subscribed: Boolean!
    timestamp: Float!
    type: String!
    author: String
  }
`
module.exports = () => [ ChannelMessage ]
