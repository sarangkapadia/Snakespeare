import "./style/wordTiles.css";
import "./style/tile.css";
import React from "react";

interface IWordTileProps {
  bytes: string;
  score: number;
}

interface INumberTileProps {
  score: number;
}

interface ILetterTileProps {
  bytes: string;
}

export const NumberTiles: React.FunctionComponent<INumberTileProps> =
  React.memo((props: INumberTileProps) => {
    return (
      <div className="tileContainer">
        {[...props.score.toString()].map((digit, index) => (
          <div key={index} className={"tile number"}>
            {digit}
          </div>
        ))}
      </div>
    );
  });

export const LetterTiles: React.FunctionComponent<ILetterTileProps> =
  React.memo((props: ILetterTileProps) => {
    return (
      <div className="tileContainer">
        {[...props.bytes].map((letter, index) => (
          <div key={index} className={"tile letter"}>
            {letter}
          </div>
        ))}
      </div>
    );
  });

export const WordTiles: React.FunctionComponent<IWordTileProps> = React.memo(
  (props: IWordTileProps) => {
    return (
      <div className={"wordTilesContainer"}>
        {props.bytes ? <LetterTiles bytes={props.bytes} /> : null}
        {props.score > 0 ? <NumberTiles score={props.score} /> : null}
      </div>
    );
  }
);
