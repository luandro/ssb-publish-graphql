const DefaultMessage = require('./default/resolver')
const { PostMessage, publishPost } = require('./post/resolver')
const { publishPrivate, publishPrivatePost } = require('./private/resolver')
const publish = require('./publish')

const messageTypeMap = {
  // about: 'AboutMessage',
  // channel: 'ChannelMessage',
  post: 'PostMessage',
}

const Query = {
  default: () => false
}

const Mutation = {
  publish: async (_, { input: { type, content } }, { sbot }) => {
    let parsedContent
    let formatedContent
    if (typeof(content) === 'string') {
      formatedContent = { content }
    } else {
      // Check if is validjson
      if (/^[\],:{}\s]*$/.test(content.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      } else {
        const doubleQuotesContent = content.replace(/'/g, '"')
        parsedContent = JSON.parse(doubleQuotesContent)
      }
      formatedContent = Object.assign({ type }, parsedContent)
    }
    
    try {
      const published = publish(formatedContent, sbot)
      return await published
    } catch (err) { throw err }
  },
  publishPrivate,
  publishPost,
  publishPrivatePost,
}

module.exports = {
  Query,
  Mutation,
  Message: {
    __resolveType: (obj) => {
      if (obj.value) {
        return messageTypeMap[obj.value.content.type] || 'DefaultMessage'
      } else {
        throw 'Message not on the right format!'
      }
    }
  },
  DefaultMessage,
  PostMessage,
}