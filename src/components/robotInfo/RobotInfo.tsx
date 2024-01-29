import './RobotInfo.css'
import ArrowButton from '../arrowButton/Arrowbutton'

interface RobotInfoProps {
    RobotId: number
}

const RobotInfo : React<RobotInfoProps>  = ({RobotId}) => {
    return(
        <div class="RobotInfoContet">
        
            <h2>Robot {RobotId}</h2>
                <div class="leftdivision"> 
                    <p>hejsan</p>
                </div>

                <div class="rightdivision">
                    <ArrowButton id={RobotId}></ArrowButton>
                    
                </div>

        </div>
    );
};

export default RobotInfo;