import React, {useState, useContext, useEffect} from 'react';
import './Arrowbutton.css'
import { updateShowArrow } from '../../types/GameState';
import { GameStateContext } from '../../App';
import {GameState} from '../../types/GameState'

interface ArrowButtonProps {
    id: number
}

const ArrowButton : React.FC<ArrowButtonProps>  = ({id}: ArrowButtonProps) => {
    
    const gameStateCtx = useContext(GameStateContext);
    
    const [arrow, setArrow] = useState(gameStateCtx.state.robots[id].showArrow);

    const handleClick = () => {
        gameStateCtx.setState((prevState: GameState) => updateShowArrow(prevState, id, !arrow));
        setArrow((prevArrow) => !prevArrow)};

    return (
        <button 
        onClick={handleClick}
        style={{ backgroundColor: arrow ? 'rgb(186, 48, 48)' : 'rgb(96, 126, 61)', color: 'white' }}
        >
            {arrow ?'Hide arrow' : 'Show arrow'} {/* Change the button text based on the state */}
        </button>
    );

};

export default ArrowButton;