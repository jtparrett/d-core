#!/usr/bin/env node

const net = require('net')
const {defaultPort} = require('./config')
const {addPeerConnection} = require('./peers')

// Spread boot nodes from process arguments
const [_, root, ...bootNodes] = process.argv

// Connect to all boot nodes
for(ip of bootNodes){
  // Spread host & port from ip
  const [host, port = defaultPort] = ip.split(':')

  // Create connection to boot node
  const connection = net.createConnection({ port, host }) 

  // Add new connections as new peer
  addPeerConnection(connection)
}

// Create Server
// Add new connections as new peer
const server = net.createServer(addPeerConnection)

// Server to listen on config defaultPort
server.listen(defaultPort)

// Close server on application exit
process.on('exit', () => {
  server.close()
})