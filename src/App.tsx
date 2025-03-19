import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import GameViewer from './components/gameViewer/GameViewer';
import { parseProto } from './helper/ParseProto';
import { parseJson } from './helper/ParseJson';
import {
  getDefaultSSLFieldUpdate,
  getDefaultAIRobotUpdate,
  getDefaultTraceSetting,
  getDefaultVectorSetting,
  getDefaultActions,
  getDefaultLog,
  getDefaultVisibleRobots,
} from './helper/defaultValues';

function App() {
  // The useStates are defined here
  const [sslFieldUpdate, setSSLFieldUpdate] = useState(
    getDefaultSSLFieldUpdate()
  );
  const [aiRobotUpdate, setAIUpdate] = useState(getDefaultAIRobotUpdate());
  const [robotActions, setRobotActions] = useState(getDefaultActions());
  const [vectorSettingBlue, setVectorSettingBlue] = useState(
    getDefaultVectorSetting()
  );
  const [vectorSettingYellow, setVectorSettingYellow] = useState(
    getDefaultVectorSetting()
  );
  const [traceSetting, setTraceSetting] = useState(getDefaultTraceSetting());
  const [visibleRobots, setvisibleRobots] = useState(getDefaultVisibleRobots());
  const [terminalLog, setTerminalLog] = useState(getDefaultLog());
  const [errorOverlay, setErrorOverlay] = useState(
    'Connecting to Controller...'
  );
  const [isConnectedToController, setIsConnectedToController] = useState(false);

  useEffect(() => {
    const vision_ws_addr = import.meta.env.VITE_SSL_VISION_WS_ADDR;
    const vision_ws_port = import.meta.env.VITE_SSL_VISION_WS_PORT;
    const ssl_vision_socket = new WebSocket(`ws://${vision_ws_addr}:${vision_ws_port}/`);
    ssl_vision_socket.binaryType = 'arraybuffer';

    ssl_vision_socket.onmessage = (event) => {
      try {
        if (!event.data) return;
        const buffer = new Uint8Array(event.data);
        if (!buffer) {
          console.error('Expected ArrayBuffer, got', typeof event.data);
          return;
        }
        parseProto(buffer, setSSLFieldUpdate, setErrorOverlay);
      } catch (e) {
        console.error('Error parsing message JSON', e);
      }
    };

    let aiSocket;
    let retryInterval;

    const connectToAI = () => {
      const ai_address = import.meta.env.VITE_AI_GAME_VIEWER_SOCKET_ADDR;
      const ai_port = import.meta.env.VITE_AI_GAME_VIEWER_SOCKET_PORT;
      aiSocket = new WebSocket(`ws://${ai_address}:${ai_port}/ws`);

      aiSocket.onerror = () => {
        setErrorOverlay('Failed to connect to AI :(');
        setIsConnectedToController(false);

        // Retry connection after 1 second
        if (!retryInterval) {
          retryInterval = setInterval(() => {
            console.log('Retrying AI WebSocket connection...');
            connectToAI();
          }, 1000);
        }
      };

      aiSocket.onopen = () => {
        setErrorOverlay('Connected!!!!');
        setIsConnectedToController(true);

        // Clear the retry interval on successful connection
        if (retryInterval) {
          clearInterval(retryInterval);
          retryInterval = null;
        }
      };

      aiSocket.onmessage = (event) => {
        try {
          if (!event.data) return;
          console.log(event.data);
          parseJson(
            event.data,
            setAIUpdate,
            setRobotActions,
            setTerminalLog,
            setErrorOverlay,
            setvisibleRobots
          );
        } catch (e) {
          console.error('Error parsing message JSON', e);
        }
      };
    };

    connectToAI();

    return () => {
      // Cleanup function to close sockets and clear intervals
      ssl_vision_socket.close();
      if (aiSocket) aiSocket.close();
      if (retryInterval) clearInterval(retryInterval);
    };
  }, []);

  // Setting the text shown in the browser tab
  useEffect(() => {
    document.title = 'SeeGoals';
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
        aiRobotUpdate={aiRobotUpdate}
        robotActions={robotActions}
        terminalLog={terminalLog}
        errorOverlay={errorOverlay}
        vectorSettingBlue={vectorSettingBlue}
        vectorSettingYellow={vectorSettingYellow}
      />
    </div>
  );
}

export default App;
