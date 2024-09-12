import React from 'react';
import './ExternalLink.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ExternalLinksProps {
    text: string;
    link: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({text, link}: ExternalLinksProps) => {
    return (
        <div className="externalLinks-wrapper">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon className="icon" /> {text}
            </a>
        </div>
    );
};

export default ExternalLinks;
