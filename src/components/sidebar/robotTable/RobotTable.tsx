import React from 'react';
import './RobotTable.css';
import LensIcon from '@mui/icons-material/Lens';
import InfoIcon from '@mui/icons-material/Info';

interface ExternalLinksProps {}

const ExternalLinks: React.FC<ExternalLinksProps> = () => {
    return (
        <div className="robotTable-wrapper">
            <div className='robotItem'>
                <p>ID</p>
                <p>Curr. act.</p>
                <p>Prev. act.</p>
                <p>batt.</p>
                <InfoIcon className='icon'/>
            </div>
            <div className='robotItem'>
                <p>0</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'red' }}/>
            </div>
            <div className='robotItem'>
                <p>1</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'green' }}/>
            </div>
            <div className='robotItem'>
                <p>2</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'green' }}/>
            </div>
            <div className='robotItem'>
                <p>3</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'red' }}/>
            </div>
            <div className='robotItem'>
                <p>4</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'green' }}/>
            </div>
            <div className='robotItem'>
                <p>10</p>
                <p>Moveto</p>
                <p>Rotate</p>
                <p>89%</p>
                <LensIcon className='icon' style={{ color: 'green' }}/>
            </div>
        </div>
    );
};

export default ExternalLinks;
