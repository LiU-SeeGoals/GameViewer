import React, {useState, useEffect,useCallback} from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../../hooks/useResizeSidebar';
import {drawArrow} from '../FootBallField';

interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 700;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);

    const [button, setButton] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setButton(button => button + 1);
        }, 1000); //one second
        return () => clearInterval(intervalId);
    }, []);

    const [variableValue, setVariableValue] = useState(0);
    const updateVariable = () => {
        setVariableValue(prevValue => (prevValue === 7 ? 0 : prevValue + 1));
    };


   

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? resizerWidth : resizerValue;

    
    return (
        <div className="sidebar" style={{ width: sidebarWidth }}>
           <div className="sidebar-content" style={{ display: contentDisplay}}>
               <h1> SeaGoals
            
            </h1>
            <h2>Robot 1</h2>
            <div class="leftdivision">
                <p> {variableValue === 1 ? <span style={{ color: 'red' }}>Id: 1</span> : 'Id: 1'}</p>
            </div>
            <div class="rightdivision">
                <p>hejsan</p>
            </div>

            <h2>Robot 2</h2>
            <div class="leftdivision">
                <p> {variableValue === 2 ? <span style={{ color: 'red' }}>Id: 2</span> : 'Id: 2'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={uppdateArrow} class="a">Disable angle arrow</button>
            </div>

            <h2>Robot 3</h2>
            <div class="leftdivision">
                <p> {variableValue === 3 ? <span style={{ color: 'red' }}>Id: 3</span> : 'Id: 3'}</p>
            </div>
            <div class="rightdivision">
                <p>hejsan</p>
            </div>

            <h2>Robot 4</h2>
            <div class="leftdivision">
            <   p> {variableValue === 4 ? <span style={{ color: 'red' }}>Id: 4</span> : 'Id: 4'}</p>
            </div>
            <div class="rightdivision">
                <p>hejsan</p>
            </div>
            <h2>Robot 5</h2>
            <div class="leftdivision">
            <   p> {variableValue === 5 ? <span style={{ color: 'red' }}>Id: 5</span> : 'Id: 5'}</p>
            </div>
            <div class="rightdivision">
                <p>hejsan</p>
            </div>
            <h2>Robot 6</h2>
            <div class="leftdivision">
                <p> {variableValue === 6 ? <span style={{ color: 'red' }}>Id: 6</span> : 'Id: 6'}</p>
            </div>
            <div class="rightdivision">
                <p>hejsan</p>
            </div>
               
            <p>Variable Value: {variableValue}</p>
            
            <div class="container">
                <div class="center">
                    <button onClick={updateVariable} class="a">Increase Variable</button>
                </div>
            </div>  
            </div>
            <div 
               className="sidebar-resizer"
               style={{width: resizerWidth}}
               onMouseDown={startResizing}
           />
        </div>
    );
};

export default Sidebar;