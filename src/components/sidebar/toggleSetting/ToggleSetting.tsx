import React, { useState, useEffect } from 'react';
import './ToggleSetting.css';
import Switch from '@mui/material/Switch';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoIcon from '@mui/icons-material/Info';

interface SettingsProps {
  name: string;
  settings: boolean[];
  setSettings: React.Dispatch<React.SetStateAction<boolean[]>>;
  itemName: string;
  tip: string;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Settings: React.FC<SettingsProps> = ({
  name,
  settings,
  setSettings,
  itemName,
  tip,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [topSwitch, setTopSwitch] = useState(false);

  // Update the topSwitch state based on the settings state
  useEffect(() => {
    setTopSwitch(settings.some(setting => setting));
  }, [settings]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleSetting = (index: number) => {
    const newSettings = [...settings];
    newSettings[index] = !newSettings[index];
    setSettings(newSettings);
  };

  const toggleAllSettings = (value: boolean) => {
    setSettings(settings.map(() => value));
  };

  const handleTopSwitchChange = () => {
    const newValue = !topSwitch;
    setTopSwitch(newValue);
    toggleAllSettings(newValue);
  };

  return (
    <>
      <div className="toggleSetting-wrapper">
        <p onClick={toggleDropdown}>
          <ArrowRightIcon className='icon-right-arrow' />
          {name}
          <span className="icon">
            <InfoIcon className='icon-info' />
            <span className="tooltip">{tip}</span>
          </span>
        </p>
        <Switch {...label} checked={topSwitch} onChange={handleTopSwitchChange} />
      </div>
      {isDropdownVisible && (
        <div className="toggle-dropdown-content">
          {settings.map((setting, index) => (
            <div className="toggleSetting-wrapper" key={index}>
              <p>{`${itemName} ${index + 1}`}</p>
              <Switch
                {...label}
                checked={setting}
                onChange={() => toggleSetting(index)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Settings;
