const unbox = ({ ciphertext }, sbot) => new Promise ((resolve, reject) => {
  return sbot.unbox(ciphertext, (err, msg) => {
    if (err) reject(err)
    resolve(msg)
  })
})


const publishPrivate = ({ content, recps }, sbot) => new Promise ((resolve, reject) => {
  return sbot.private.publish(content, recps, (err, msg) => {
    if (err) reject(err)
    resolve(msg)
  })
})

module.exports = {
  publishPrivate: async (_, { content, recipients }, { sbot }) => {
    try {
      const msg = await publishPrivate({ content, recps: recipients }, sbot)
      // console.log('PRIVATE', msg)
      return msg
    } catch (err) { throw err }
  },
  publishPrivatePost: async (_, { text, recipients }, { sbot }) => {
    const publishContent = {
      type: 'post',
      text
    }
    try {
      const msg = await publishPrivate({ content: publishContent, recps: recipients }, sbot)
      // console.log('PRIVATE', msg)
      return msg
    } catch (err) { throw err }
  },
  unbox: async (_, { ciphertext }, { sbot }) => {
    try {
      const msg = await unbox({ ciphertext }, sbot)
      console.log('Deciphered', msg)
      return msg
    } catch (err) { throw err }
  }
}