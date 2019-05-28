const publish = require('../publish')

module.exports = {
  PostMessage: {
    type: (msg) => msg.value.content.type,
    text: (msg) => msg.value.content.text,
    root: (msg) => msg.value.content.root,
    branch: (msg) => {
      const branch = msg.value.content.branch
      if(typeof branch === 'string' || branch instanceof String) { return [branch] }
      return branch
    },
    revisionRoot: (msg) => msg.value.content.revisionRoot,
    revisionBranch: (msg) => msg.value.content.revisionBranch,
    key: (msg) => msg.key,
    author: (msg) => msg.value.author,
    sequence: (msg) => msg.value.sequence,
    timestamp: (msg) => msg.value.timestamp,
    content: (msg) => msg.value.content,
    mentions: (msg) => msg.value.content.mentions,
    reply: (msg) => {
      let replies = []
      const reply = msg.value.content.reply
      if (reply) {
        Object.keys(reply).map(key => {
          replies.push({
            from: key,
            to: reply[key]
          })
        }) 
      }
      return replies
    },
  },
  publishPost: async (_, { text }, { sbot }) => {
    const publishContent = {
      type: 'post',
      text
    }
    try {
      const msg = await publish(publishContent, sbot)
      return msg
    } catch (err) { throw err }
  }
}