import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ActionDTO } from './types/ActionDTO'

import './App.css'

import Sidebar from './components/sidebar'
import GameViewer from './components/gameViewer'
import { GameState, parseGameState, getDefaultGameState} from './types/GameState';

function App() {
  const [gameState, setGameState] = useState<GameState>(getDefaultGameState());
  // Using useRef to keep the WebSocket instance across renders
  const socketRef = useRef<WebSocket | null>(null);

  let actionsToSend: ActionDTO[] = [];

  useEffect(() => {
    // Initialize WebSocket only if it's not already established
    if (!socketRef.current) {
      socketRef.current = new WebSocket('ws://localhost:8080/ws');

      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
      };

      socketRef.current.onmessage = (event) => {
        try {
          if (!event.data) {
            return;
          }
          console.log(event.data);
          const newGameState = parseGameState(gameState, event.data);
          setGameState(newGameState);
        } catch (e) {
          console.error('Error parsing message JSON', e);
        }
      };

      socketRef.current.onerror = (event) => {
        console.error('WebSocket error:', event);
      };
    }

    // Clean up the WebSocket connection on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to send JSON messages to the server
  const sendMessageToServer = (message: ActionDTO) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open.');
    }
  };

  useEffect(() => {

    const actionDTO: ActionDTO = {  // Used for testing to send an action to the server
      Id: 0,
      Action: 2,
      PosX: 3,
      PosY: 4,
      PosW: 5.554,
      DestX: 6,
      DestY: 7,
      DestW: 8.0,
      Dribble: false
  };
  actionsToSend.push(actionDTO);

    const intervalId = setInterval(() => {
      if (actionsToSend.length > 0) {
        sendMessageToServer(actionsToSend.shift()!);
      }
    }, 100);
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  window.addEventListener('beforeunload', () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  });

  return (
    <div className="app-container">
      <Sidebar/>
      <GameViewer gameState={gameState}/>
    </div>
  )
}

export default App
