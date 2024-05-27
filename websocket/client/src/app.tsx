import { ReactElement, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

import './assets/styles/global.scss';

export const App = (): ReactElement => {
  const socket = useRef<Socket>();
  const ping = (): void => {
    if (socket.current) {
      socket.current.emit('ping');
    }
  };

  useEffect(() => {
    socket.current = io('http://localhost:4000', {
      reconnectionDelay: 10000, // defaults to 1000
      reconnectionDelayMax: 10000, // defaults to 5000
    }).connect();

    socket.current.on('pong', (data) => {
      console.log('pong', data);
    });

    return (): void => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={ping}>Ping!</button>
    </div>
  );
};
