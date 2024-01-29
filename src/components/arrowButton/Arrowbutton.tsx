import React, {useState, useContext, useEffect} from 'react';
import './Arrowbutton.css'
import { updateShowArrow } from '../../types/GameState';
import { GameStateContext } from '../../App';
import {GameState} from '../../types/GameState'

interface ArrowButtonProps {
    id: number
}

const ArrowButton : React<ArrowButtonProps>  = ({id}: ArrowButtonProps) => {
    
    const gameStateCtx = useContext(GameStateContext);
    
    const [arrow, setArrow] = useState(gameStateCtx.state.robots[id].showArrow);

    const handleClick = () => {
        gameStateCtx.setState((prevState: GameState) => updateShowArrow(prevState, id, !arrow));
        setArrow((prevArrow) => !prevArrow)};

    return (
        <button 
        onClick={handleClick}
        style={{ backgroundColor: arrow ? 'rgb(96, 126, 61)' : 'rgb(186, 48, 48)', color: 'white' }}
        >
            {arrow ?'Arrow' : 'No arrow'} {/* Change the button text based on the state */}
        </button>
    );

};

export default ArrowButton;