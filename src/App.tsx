import { useState, useEffect } from 'react'
import { createContext } from 'react'

import './App.css'

import Sidebar from './components/sidebar/Sidebar'
import GameViewer from './components/gameViewer/GameViewer'
import { GameState, parseGameState, getDefaultGameState} from './types/GameState';

export const GameStateContext = createContext({
  state: getDefaultGameState(),
  setState: (_: any) => {},
});

function App() {
  const [gameState, setGameState] = useState<GameState>(getDefaultGameState());

  // Setup context object
  const gameStateCtx = {
    state: gameState,
    setState: (newState: GameState) => {setGameState(newState)} 
  };

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
      <GameStateContext.Provider value={gameStateCtx}>
        <Sidebar/>
        <GameViewer gameState={gameState}/>
      </GameStateContext.Provider>
    </div>
  )
}

export default App
