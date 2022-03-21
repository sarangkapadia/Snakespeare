import React, { useCallback, useState } from 'react';
import  { Box } from './box';
import { Score } from './score';
import { Button } from './button';
import { useInterval } from './useInterval';
import './style/grid.css'

const root = document.querySelector(':root')!;
const rootStyle = getComputedStyle(root);
let gridSize = parseInt(rootStyle.getPropertyValue('--gridSize'));
const snakeEndsInit = {tail:{row:5, col:5}, head:{row:8, col:5}};

let grid:string[][] = Array.from(Array(gridSize), () => new Array(gridSize).fill('b'));
grid[5][5] = grid[6][5] = grid[7][5] = grid[8][5] = 's';
enum Direction{
    Up = 1,
    Down,
    Right,
    Left,
}

let currentHeadDir = Direction.Down; 
let currentTailDir = Direction.Down; 

// for (let i = 0; i<gridSize; i++)
//     for(let j = 0; j<gridSize; j++)
//         grid[i][j] = 'b';


 
export const Grid: React.FunctionComponent = () => {
    const [snakeEnds, setSnakeEnds] = useState(snakeEndsInit);
    const [playing, setPlaying] = useState(false);

    const getNewEnds = (ends: typeof snakeEnds) => {
        let newCol = snakeEnds.head.col;
        let newRow = snakeEnds.head.row;

        switch(currentHeadDir){
            case Direction.Up: {
                newRow = (snakeEnds.head.row - 1) < 0 ? gridSize - 1 : snakeEnds.head.row - 1;
                break;
            }
            case Direction.Down:{
                newRow = (snakeEnds.head.row + 1) >= gridSize ? 0 : snakeEnds.head.row + 1;
                break;
            }
            case Direction.Right:{
                newCol = (snakeEnds.head.col + 1) >= gridSize ? 0 : snakeEnds.head.col + 1;
                break;
            }
            case Direction.Left:{
                newCol = (snakeEnds.head.col - 1) < 0 ? gridSize - 1 : snakeEnds.head.col - 1;
                break;
            }
            default: throw(new Error('Invalid head direction!'));
        }
        ends.head.row = newRow;
        ends.head.col = newCol;

        grid[newRow][newCol] = 's'; // assign new head
        grid[snakeEnds.tail.row][snakeEnds.tail.col] = 'b'; //clear current tail

        newCol = snakeEnds.tail.col;
        newRow = snakeEnds.tail.row;

        switch(currentTailDir){
            case Direction.Up: {
                newRow = (snakeEnds.tail.row - 1) < 0 ? gridSize - 1 : snakeEnds.tail.row - 1;
                break;
            }
            case Direction.Down:{
                newRow = (snakeEnds.tail.row + 1) >= gridSize ? 0 : snakeEnds.tail.row + 1;
                break;
            }
            case Direction.Right:{
                newCol = (snakeEnds.tail.col + 1) >= gridSize ? 0 : snakeEnds.tail.col + 1;
                break;
            }
            case Direction.Left:{
                newCol = (snakeEnds.tail.col - 1) < 0 ? gridSize - 1 : snakeEnds.tail.col - 1;
                break;
            }
            default: throw(new Error('Invalid tail direction!'));
        }

        ends.tail.row = newRow;
        ends.tail.col = newCol;

        return ends;
    }

    const onTick = () => {
        let ends = {...snakeEnds};
        console.log('head = ', ends.head, 'tail = ', ends.tail);
        setSnakeEnds(getNewEnds(ends));
    }

    useInterval(
        onTick,
        // Delay in milliseconds or null to stop it
        playing ? 100 : null
      );

    const handleOnNewGame = useCallback(() => {
        setPlaying(playing => !playing);
    },[]);

    console.log("grid rendering");

    return (
        <div >
            <div className={'gridContainer'}>
                {grid.flat().map((box, index) => <Box className={box==='b'?'box':'snake'} id={index} key={index} />)}
            </div>
            <div className={'appUtils'}>
                <Score currentScore={0}></Score>
                <Button onClick={handleOnNewGame} label={playing?'Stop Game':'New Game'}/>
            </div>  
    </div>);
}