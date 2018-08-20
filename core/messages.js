const SHA256 = require('crypto-js/sha256')

const messages = {}

const addPeerMessage = (message) => {
  // Generate message id from hash of message content
  const id = SHA256(message).toString()

  // Check if message was previously received
  if(messages[id]) return false

  // Log id and message to console
  console.log(id, message)

  // Add message to messages collection
  return messages[id] = message
}

module.exports = {
  addPeerMessage
}