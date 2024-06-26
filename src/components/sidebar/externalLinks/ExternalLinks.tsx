import React from 'react';
import './ExternalLinks.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ExternalLinksProps {}

const ExternalLinks: React.FC<ExternalLinksProps> = () => {
    return (
        <div className="externalLinks-wrapper">
            <a href="https://www.fia.com/" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon className="icon" /> Game controller
            </a>
            <a href="https://www.fia.com/" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon className="icon" /> SSL vision
            </a>
            <a href="https://www.fia.com/" target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon className="icon" /> Jenkins (container config)
            </a>
        </div>
    );
};

export default ExternalLinks;
