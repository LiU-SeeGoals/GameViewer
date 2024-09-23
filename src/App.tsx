import { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import GameViewer from './components/gameViewer/GameViewer'
import {parseJson} from './helper/ParseJson'
import {getDefaultTraceSetting, 
  getDefaultVectorSetting, 
  getDefaultActions, 
  getDefaultBallPos, 
  getDefaultRobotPos,
  getDefaultLog,
  getDefaultVisibleRobots} from './helper/defaultValues'

function App() {
  // The useStates are defined here
  const [robotPositions, setRobotPositions] = useState(getDefaultRobotPos());
  const [ballPosition, setBallPosition] = useState(getDefaultBallPos());
  const [robotActions, setRobotActions] = useState(getDefaultActions());
  const [vectorSettingBlue, setVectorSettingBlue] = useState(getDefaultVectorSetting());
  const [vectorSettingYellow, setVectorSettingYellow] = useState(getDefaultVectorSetting());
  const [traceSetting, setTraceSetting] = useState(getDefaultTraceSetting());
  const [visibleRobots, setvisibleRobots] = useState(getDefaultVisibleRobots());
  const [terminalLog, setTerminalLog] = useState(getDefaultLog());
  const [errorOverlay, setErrorOverlay] = useState("No connection to controller.");
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');
    socket.onmessage = (event) => {
      try {
        if (!event.data) {
          return;
        }

        parseJson(
          event.data,
          setRobotPositions, 
          setBallPosition,
          setRobotActions,
          setTerminalLog,
          setErrorOverlay,
          setvisibleRobots,
          );

      } catch (e) {
        console.error('Error parsing message JSON', e);
      }
    };

    // Clean up the WebSocket connection on unmount
    return () => {};
  }, []);

  // Setting the text shown in the browser tab
  useEffect(() => {
    document.title = "SeaGoals";
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        vectorSettingBlue={vectorSettingBlue}
        setVectorSettingBlue={setVectorSettingBlue}
        vectorSettingYellow={vectorSettingYellow}
        setVectorSettingYellow={setVectorSettingYellow}
        traceSetting={traceSetting}
        setTraceSetting={setTraceSetting}
        robotActions={robotActions}
        visibleRobots={visibleRobots}
        />
      <GameViewer
        robotPositions={robotPositions}
        ballPosition={ballPosition}
        terminalLog={terminalLog}
        errorOverlay={errorOverlay}
        vectorSettingBlue={vectorSettingBlue}
        vectorSettingYellow={vectorSettingYellow}
        />
    </div>
  );
}

export default App
