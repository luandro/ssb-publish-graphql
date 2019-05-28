module.exports = (content, sbot) => new Promise((resolve, reject) => {
  sbot.publish(content, (err, msg) => {
    if (err) {
      console.log(err)
      reject(err)
    }
    resolve(msg)
  })
})