import React from 'react';
import './GameViewer.css';
import useResizeSidebar from '../../hooks/useResizeSidebar';
import FootBallField from './FootBallField';
interface gameViewerProps {

}

const GameViewer: React.FC<gameViewerProps> = () => {
    const startHeightResizer = 800;
    const resizerWidth = 20;

    const {value: resizerValue, startResizing} = useResizeSidebar(true, startHeightResizer);


    return (
        <div className="game-viewer-container">
            <FootBallField height={resizerValue}/>

            <div className="game-viewer-resizer"
                 style={{height: resizerWidth}}
                 onMouseDown={startResizing}
            />
            <div className="game-viewer-player"/>
        </div>
    )
};

export default GameViewer;