import React from 'react';
import './Sidebar.css'
import useResizeSidebar from '../../hooks/useResizeSidebar';
import ExternalLink from './externalLink/ExternalLink';
import Header from './header/Header';
import ToggleSetting from './toggleSetting/ToggleSetting';
import ButtonSetting from './buttonSetting/ButtonSetting';
import RobotTable from './robotTable/RobotTable'

import { Action } from "../../types/Action";

interface SidebarProps {
    vectorSettingBlue: boolean[];
    setVectorSettingBlue: React.Dispatch<React.SetStateAction<boolean[]>>;
    vectorSettingYellow: boolean[];
    setVectorSettingYellow: React.Dispatch<React.SetStateAction<boolean[]>>;
    traceSetting: boolean[];
    setTraceSetting: React.Dispatch<React.SetStateAction<boolean[]>>;
    robotActions: Action[];
    visibleRobots: boolean[];
}

const Sidebar: React.FC<SidebarProps> = ({
    vectorSettingBlue,
    setVectorSettingBlue,
    vectorSettingYellow,
    setVectorSettingYellow,
    traceSetting,
    setTraceSetting,
    robotActions,
    visibleRobots,
  }) => {

    // Resizeble sidebar stuff
    const minSidebarContentWidth = 250;
    const startWidthSidebar = 400;
    const resizerWidth = 5;

    const { value: resizerValue, startResizing } = useResizeSidebar(false, startWidthSidebar);

    const contentDisplay: string = resizerValue < minSidebarContentWidth + resizerWidth ? 'none' : 'inline';
    const sidebarWidth: number = resizerValue < minSidebarContentWidth + resizerWidth ? 0 : resizerValue;

    const sidebarStyle = {
        width: sidebarWidth,
        display: contentDisplay,
    };

    const vectorTip = "Are you stupid? It's kind of self-explanatory";
    const traceTip = "Trace shows a line of where the robot has been. It's like a snail trail but for robots.";

    return (

        <div className="sidebar-wrapper">
            <div className="sidebar" style={sidebarStyle}>
                <div className="sidebar-content">
                    <Header />
                    <hr />
                    <ExternalLink text={"SSL vision"} link={"https://www.google.com"} />
                    <ExternalLink text={"Game controller"} link={"https://www.google.com"} />
                    <ExternalLink text={"Jenkins (container config)"} link={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} />
                    <hr />
                    <ToggleSetting 
                        name={"Show vector"} 
                        settingsBlue={vectorSettingBlue} 
                        settingsYellow={vectorSettingYellow} 
                        setSettingsBlue={setVectorSettingBlue}
                        setSettingsYellow={setVectorSettingYellow}


                        itemName='Robot'
                        tip={vectorTip}/>
                    <ToggleSetting
                        name={"Show trace"} 
                        settingsBlue={traceSetting} 
                        settingsYellow={traceSetting} 
                        setSettingsBlue={setTraceSetting}
                        setSettingsYellow={setTraceSetting}
                        itemName='Robot'
                        tip={traceTip}/>
                    <ButtonSetting/> {/* Not implemented yet */}
                    <hr />
                    <RobotTable 
                        robotActions={robotActions}
                        visibleRobots={visibleRobots}/>
                </div>
            </div>
            <div
                className="sidebar-resizer"
                style={{ width: resizerWidth }}
                onMouseDown={startResizing}
            />
        </div>
    );
};

export default Sidebar;
