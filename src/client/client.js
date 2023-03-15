import React from 'react';
import useWebSocket from 'react-use-websocket';



function Client() {
  /*useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });*/

  return (
    <div>Hello WebSockets!</div>
  );
}

export default Client;