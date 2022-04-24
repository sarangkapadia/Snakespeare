import "./style/wordTiles.css";
import "./style/tile.css";
import React from "react";
interface IWordTileProps {
  bytes: string;
  score: number;
}
export const WordTiles: React.FunctionComponent<IWordTileProps> = React.memo(
  (props: IWordTileProps) => {
    return (
      <div className={"wordTilesContainer"}>
        <div className="tileContainer">
          {[...props.bytes].map((letter, index) => (
            <div key={index} className={"tileLetter"}>
              {letter}
            </div>
          ))}
        </div>
        <div className="tileContainer">
          {[...props.score.toString()].map((digit, index) => (
            <div key={index} className={"tileNumber"}>
              {digit}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
