const SHA256 = require('crypto-js/sha256')

const addPeerMessage = (messages = {}) => (message) => {
  // Generate message id from hash of message content
  const id = SHA256(message).toString()

  // Check if message was previously received
  if(messages[id]) return false

  // Log id and message to console
  console.log(id, message)

  // Add message to messages collection
  messages = {
    ...messages,
    [id]: message
  }

  return true
}

module.exports = {
  addPeerMessage: addPeerMessage()
}