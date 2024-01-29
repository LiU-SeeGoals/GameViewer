import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import Sidebar from './components/sidebar'
import GameViewer from './components/gameViewer'
import { GameState, parseGameState, getDefaultGameState} from './types/GameState';

function App() {
  const [gameState, setGameState] = useState<GameState>(getDefaultGameState());

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onmessage = (event) => {
      try {
        if (!event.data) {
          return;
        }
        //console.log(event.data);
        setGameState(parseGameState(gameState, event.data));
        //console.log(gameState);
      } catch (e) {
        console.error('Error parsing message JSON', e);
      }
    };

    // Clean up the WebSocket connection on unmount
    return () => {};
  }, []);

  return (
    <div className="app-container">
      <Sidebar/>
      <GameViewer gameState={gameState}/>
    </div>
  )
}

export default App
