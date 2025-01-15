import { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import GameViewer from './components/gameViewer/GameViewer'
import { parseProto } from './helper/ParseProto'
import { parseJson } from './helper/ParseJson'
import {
  getDefaultSSLFieldUpdate,
  getDefaultTraceSetting, 
  getDefaultVectorSetting, 
  getDefaultActions, 
  getDefaultLog,
  getDefaultVisibleRobots} from './helper/defaultValues'
  
function App() {
  // The useStates are defined here
  const [sslFieldUpdate, setSSLFieldUpdate] = useState(getDefaultSSLFieldUpdate());
  const [robotActions, setRobotActions] = useState(getDefaultActions());
  const [vectorSettingBlue, setVectorSettingBlue] = useState(getDefaultVectorSetting());
  const [vectorSettingYellow, setVectorSettingYellow] = useState(getDefaultVectorSetting());
  const [traceSetting, setTraceSetting] = useState(getDefaultTraceSetting());
  const [visibleRobots, setvisibleRobots] = useState(getDefaultVisibleRobots());
  const [terminalLog, setTerminalLog] = useState(getDefaultLog());
  const [errorOverlay, setErrorOverlay] = useState("Connecting to Controller...");
  const [isConnectedToController, setIsConnectedToController] = useState(false);
  
  useEffect(() => {
    
    const ssl_vision_socket = new WebSocket('ws://localhost:3000/');
    ssl_vision_socket.binaryType = 'arraybuffer';  // Set binary type to 'arraybuffer'
    
    ssl_vision_socket.onmessage = (event) => {
      try {
        if (!event.data) {
          return;
        }
        const buffer = new Uint8Array(event.data)
        // Check if the data is an ArrayBuffer
        // const buffer = Uint8Array.from(atob(event.data), c => c.charCodeAt(0));
        
        if (!buffer) {
          console.error("Expected ArrayBuffer, got", typeof event.data);
          return;
        }
        
        // Log raw data to check if it's received correctly
        // console.log("Raw received data:", buffer);
        
        // Decode the protobuf message
        parseProto(
          buffer,
          setSSLFieldUpdate,
          setErrorOverlay
        );
        
      } catch (e) {
        console.error('Error parsing message JSON', e);
      }
      
    };
    
    const ai_socket = new WebSocket("ws://localhost:8080/ws");

    ai_socket.onerror = (event) => {
      setErrorOverlay("Failed to connect to AI Controller:(");
      setIsConnectedToController(false);
    };
    
    ai_socket.onopen = (event) => {
      setErrorOverlay("");
      setIsConnectedToController(true);
    }
  
    ai_socket.onmessage = (event) => {
      try {
        if (!event.data) {
          return;
        }

        parseJson(
          event.data,
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
    document.title = "SeeGoals";
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
        isConnectedToController={isConnectedToController}
        />
      <GameViewer
        sslFieldUpdate={sslFieldUpdate}
        terminalLog={terminalLog}
        errorOverlay={errorOverlay}
        vectorSettingBlue={vectorSettingBlue}
        vectorSettingYellow={vectorSettingYellow}
        />
    </div>
  );
}

export default App
