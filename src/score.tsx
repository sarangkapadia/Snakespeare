import React from 'react';

interface IScoreProps{
    currentScore:number;
}
export const Score: React.FunctionComponent<IScoreProps> = React.memo((props) => {
    return <h2>Score: {props.currentScore}</h2>
});