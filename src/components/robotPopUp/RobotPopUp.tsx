import './RobotPopUp.css';
import ArrowButton from '../arrowButton/Arrowbutton'
interface RobotPopUpProps{
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const RobotPopUp = ({ isOpen, onClose, id }: RobotPopUpProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Robot {id}</h2>
        <ArrowButton id={id}></ArrowButton>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RobotPopUp;
