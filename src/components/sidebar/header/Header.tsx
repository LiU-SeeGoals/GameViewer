import React, { useState } from 'react';
import './Header.css'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {


    return (

        <div className="header-wrapper">
            <img src="./src/assets/Fia_logo.png" alt="logo" className="logo" />
            <h1>SeeGoals</h1>
        </div>
    );
};

export default Header;
