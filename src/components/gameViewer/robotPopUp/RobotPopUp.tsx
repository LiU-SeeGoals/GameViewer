import React from 'react';
import './RobotPopUp.css';
interface RobotPopUpProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const RobotPopUp = ({ isOpen, onClose, children }: RobotPopUpProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RobotPopUp;
