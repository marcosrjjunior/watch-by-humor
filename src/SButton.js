import React from 'react';
import './SButton.css';

function SButton({onClick, name, size = ''}) {
    return (
        <a
            href=""
            className={"SButton "+size}
            onClick={onClick}
        >{name}</a>
    );
}

export default SButton;