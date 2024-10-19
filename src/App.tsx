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
  getDefaultVisibleRobots} from './helper/defaultValues'

type Log = Record<string, any>;

function App() {
  // The useStates are defined here
  const [robotPositions, setRobotPositions] = useState(getDefaultRobotPos());
  const [ballPosition, setBallPosition] = useState(getDefaultBallPos());
  const [robotActions, setRobotActions] = useState(getDefaultActions());
  const [vectorSettingBlue, setVectorSettingBlue] = useState(getDefaultVectorSetting());
  const [vectorSettingYellow, setVectorSettingYellow] = useState(getDefaultVectorSetting());
  const [traceSetting, setTraceSetting] = useState(getDefaultTraceSetting());
  const [visibleRobots, setvisibleRobots] = useState(getDefaultVisibleRobots());
  const [logs, setLogs] = useState<Log[]>([]);
  const [errorOverlay, setErrorOverlay] = useState("No connection to controller.");
 

//-----------WebSocket for gamestate----------------
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
          setErrorOverlay,
          setvisibleRobots,
          setLogs,
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
        errorOverlay={errorOverlay}
        vectorSettingBlue={vectorSettingBlue}
        vectorSettingYellow={vectorSettingYellow}
        logs={logs}
        />
    </div>
  );
}

export default App
