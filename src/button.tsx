import React from 'react';
import './style/button.css';

interface IButtonProps{
    onClick: () => void;
    label: string;
}

export const Button:React.FunctionComponent<IButtonProps> = React.memo((props) => {
    console.log("Button rendering");
    return <button className={'newGame'} onClick={props.onClick} >{props.label}</button>;
});