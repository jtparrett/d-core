const net = require('net')
const {port, localhost} = require('./config')
const {addPeerConnection} = require('./peers')

// Spread boot nodes from process arguments
const [_, root, ...bootNodes] = process.argv

// Connect to all boot nodes
for(host of bootNodes){
  // Create connection to boot node on config port
  const connection = net.createConnection({ port, host })

  // Add new connections as new peer
  addPeerConnection(connection)
}

// Create Server
// Add new connections as new peer
const server = net.createServer(addPeerConnection)

// Server to listen on config port
server.listen(port, localhost)