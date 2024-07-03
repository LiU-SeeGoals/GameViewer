import React, { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import GameViewer from './components/gameViewer/GameViewer'
import {parseProto} from './helper/ParseProto'
import {getDefaultTraceSetting, 
  getDefaultVectorSetting, 
  getDefaultActions, 
  getDefaultBallPos, 
  getDefaultRobotPos,
  getDefaultLog} from './helper/defaultValues'

function App() {
  // The useState are defined here
  const [robotPositions, setRobotPositions] = useState(getDefaultRobotPos());
  const [ballPosition, setBallPosition] = useState(getDefaultBallPos());
  const [robotActions, setRobotActions] = useState(getDefaultActions());
  const [vectorSetting, setVectorSetting] = useState(getDefaultVectorSetting());
  const [traceSetting, setTraceSetting] = useState(getDefaultTraceSetting());
  const [terminalLog, setTerminalLog] = useState(getDefaultLog());

  useEffect(() => {
    console.log('im here 123');
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onmessage = (event) => {
      try {
        if (!event.data) {
          return;
        }

        // TODO: Uncomment and implement this function
        // parseProto(
        //   setRobotPositions, 
        //   setBallPosition,
        //   setRobotActions,
        //   setTerminalLog,
        //   event.data);

      } catch (e) {
        console.error('Error parsing message JSON', e);
      }
    };

    // Clean up the WebSocket connection on unmount
    return () => {};
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        vectorSetting={vectorSetting}
        setVectorSetting={setVectorSetting}
        traceSetting={traceSetting}
        setTraceSetting={setTraceSetting}
        robotActions={robotActions}
        />
      <GameViewer
        robotPositions={robotPositions} // Note: we should not not be passing setters to GameViewer
        ballPosition={ballPosition}
        terminalLog={terminalLog}
        />
    </div>
  );
}

export default App
