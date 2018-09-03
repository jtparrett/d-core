const uuid = require('uuid/v1')
const {addPeerMessage} = require('./messages')

const broadcastToAllPeers = (peers, message) => {
  // Broadcast message to all peers
  for(peer of Object.values(peers)){
    // Write buffer to peers
    peer.write(message)
  }
}

const addPeerConnection = (peers = {}) => (connection) => {
  // Generate timestamp based id
  const id = uuid()

  // Log new peer
  console.log('New Peer Connection', id)

  // Listen for messages from connection
  connection.on('data', (data) => {
    // Convert message buffer to string
    const bufferAsString = data.toString()

    // Add message to messages collection
    const messageWasAdded = addPeerMessage(bufferAsString)

    // Check if message was added
    if(messageWasAdded){
      // Broadcast message to all peers
      broadcastToAllPeers(peers, bufferAsString)
    }
  })

  // Remove peer on end of connection
  connection.on('end', () => {
    const {[id]: removedPeer, ...rest} = peers
    peers = rest
  })

  // Log all caught errors
  connection.on('error', (err) => {
    console.log(err)
  })

  // Add connection as a new peer
  peers = {
    ...peers,
    [id]: connection
  }
}

module.exports = {
  addPeerConnection: addPeerConnection(),
  broadcastToAllPeers
}