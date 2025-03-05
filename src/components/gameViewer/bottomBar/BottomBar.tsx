import React from 'react';
import './BottomBar.css';

interface BottomBarProps {
  terminalLog: string[];
}

const BottomBar: React.FC<BottomBarProps> = ({ terminalLog }) => {
  return (
    <div className="bottomBar-wrapper">
      {terminalLog.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};

export default BottomBar;
