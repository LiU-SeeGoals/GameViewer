import React from 'react';
import './RobotTable.css';
import LensIcon from '@mui/icons-material/Lens';
import InfoIcon from '@mui/icons-material/Info';
import { Action } from '../../../types/Action';
import { actionToStr } from '../../../helper/defaultValues';

interface RobotTableProps {
  robotActions: Action[];
  visibleRobots: boolean[];
}

const RobotTable: React.FC<RobotTableProps> = ({
  robotActions,
  visibleRobots,
}) => {
  const tip = 'This only shows if the SSL vision can currenty see the robot';

  return (
    <div className="robotTable-wrapper">
      <div className="robotItem header">
        <p>ID</p>
        <p>Curr. act.</p>
        <p>Prev. act.</p>
        <p>batt.</p>
        <span className="icon-info">
          <InfoIcon className="icon" />
          <span className="tooltip">{tip}</span>
        </span>
      </div>
      {robotActions.map((action, index) => (
        <div className="robotItem" key={index}>
          <p>{action.Id}</p>
          <p>{actionToStr(action.Action)}</p>
          <p>{actionToStr(action.PreviousAction)}</p>
          <p>-</p>
          <LensIcon
            className="icon"
            style={{ color: visibleRobots[index] ? 'green' : 'red' }}
          />
        </div>
      ))}
    </div>
  );
};

export default RobotTable;
