const SHA256 = require('crypto-js/sha256')

const messages = {}

const addPeerMessage = (message) => {
  // Generate message id from hash of message content
  const id = SHA256(message).toString()

  // Add message to messages collection
  messages[id] = message

  // Log id and message to console
  console.log(id, message)
}

module.exports = {
  addPeerMessage
}