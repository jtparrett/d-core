const uuid = require('uuid/v1')
const {addPeerMessage} = require('./messages')

const peers = {}

const broadcastToAllPeers = (message) => {
  // Broadcast message to all peers
  for(peer of Object.values(peers)){
    // Write buffer to peers
    peer.write(message)
  }
}

const addPeerConnection = (connection) => {
  // Generate timestamp based id
  const id = uuid()

  // Listen for messages from connection
  connection.on('data', (data) => {
    // Convert message buffer to string
    const bufferAsString = data.toString()

    // Add message to messages collection
    const messageWasAdded = addPeerMessage(bufferAsString)

    // Check if message was added
    if(messageWasAdded){
      // Broadcast message to all peers
      broadcastToAllPeers(bufferAsString)
    }
  })

  // Remove peer on end of connection
  connection.on('end', () => {
    delete peers[id]
  })

  // Add connection as a new peer
  peers[id] = connection
}

module.exports = {
  addPeerConnection,
  broadcastToAllPeers
}