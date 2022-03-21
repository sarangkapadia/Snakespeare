import React from 'react';
import './style/box.css';

interface IBoxProps{
    id?: number,
    className: string,
}

export const Box:React.FunctionComponent<IBoxProps> = React.memo((props) => {
    console.log("Box rendering props: ", props.className);
    return <div className={props.className} ></div>;
});