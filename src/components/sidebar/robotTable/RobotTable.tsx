import React from 'react';
import './RobotTable.css';
import LensIcon from '@mui/icons-material/Lens';
import InfoIcon from '@mui/icons-material/Info';
import { Action } from "../../../types/Action";

interface ExternalLinksProps {
  robotActions: Action[];
}

const getActionName = (actionCode: number) => {
  switch (actionCode) {
    case 0:
      return "IDLE";
    case 1:
      return "STOP";
    case 2:
      return "KICK";
    case 3:
      return "MOVE";
    case 4:
      return "INIT";
    case 5:
      return "SET_NAVIGATION_DIRECTION";
    case 6:
      return "ROTATE";
    default:
      return "UNKNOWN";
  }
};

const ExternalLinks: React.FC<ExternalLinksProps> = ({ robotActions }) => {
  return (
    <div className="robotTable-wrapper">
      <div className='robotItem header'>
        <p>ID</p>
        <p>Curr. act.</p>
        <p>Prev. act.</p>
        <InfoIcon className='icon' />
      </div>
      {robotActions.map((action, index) => (
        <div className='robotItem' key={index}>
          <p>{action.Id}</p>
          <p>{getActionName(action.Action)}</p>
          <p>{getActionName(action.previousAction)}</p>
          <LensIcon className='icon' style={{ color: action.Action === 0 ? 'red' : 'green' }} />
        </div>
      ))}
    </div>
  );
};

export default ExternalLinks;
