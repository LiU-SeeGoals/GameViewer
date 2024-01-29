import React, {useState, useEffect,useCallback} from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const minSidebarContentWidth = 100;
    const startWidthSidebar = 700;
    const resizerWidth = 10;

    const {value: resizerValue, startResizing} = useResizeSidebar(false, startWidthSidebar);


    const [variableValue, setVariableValue] = useState(0);
    const updateVariable = () => {
        setVariableValue(prevValue => (prevValue === 7 ? 0 : prevValue + 1));
    };

    
    const [arrow, setArrow] = useState(false);
    
    const handleClick = () => {
        // Toggle the state between start and stop
        setArrow(prevState => !prevState);
    
        // Perform the corresponding action based on the current state
        if (arrow) {
        // Stop action
        console.log('Stopping...');
        // Add your stop logic here
        } else {
        // Start action
        console.log('Starting...');
        // Add your start logic here
        }
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
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>
            </div>

            <h2>Robot 2</h2>
            <div class="leftdivision">
                <p> {variableValue === 2 ? <span style={{ color: 'red' }}>Id: 2</span> : 'Id: 2'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>
            </div>

            <h2>Robot 3</h2>
            <div class="leftdivision">
                <p> {variableValue === 3 ? <span style={{ color: 'red' }}>Id: 3</span> : 'Id: 3'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>            </div>

            <h2>Robot 4</h2>
            <div class="leftdivision">
            <   p> {variableValue === 4 ? <span style={{ color: 'red' }}>Id: 4</span> : 'Id: 4'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>            
            </div>
            <h2>Robot 5</h2>
            <div class="leftdivision">
            <   p> {variableValue === 5 ? <span style={{ color: 'red' }}>Id: 5</span> : 'Id: 5'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>  
            </div>
            <h2>Robot 6</h2>
            <div class="leftdivision">
                <p> {variableValue === 6 ? <span style={{ color: 'red' }}>Id: 6</span> : 'Id: 6'}</p>
            </div>
            <div class="rightdivision">
                <button onClick={handleClick}>
                    {arrow ? 'Enable arrow' : 'Disable arrow'} {/* Change the button text based on the state */}
                </button>  
            </div>
               
            <p>Variable Value: {variableValue}</p>
            
            <div class="container">
                <div class="center">
                    <button onClick={updateVariable}>Increase Variable</button>
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