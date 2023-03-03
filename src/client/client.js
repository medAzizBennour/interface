import React from 'react';
import useWebSocket from 'react-use-websocket';


const WS_URL = 'ws://localhost:8000';

function Client() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <div>Hello WebSockets!</div>
  );
}

export default Client;