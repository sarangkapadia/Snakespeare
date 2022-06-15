import "./style/wordTiles.css";
import "./style/tile.css";
import { threshold7 } from "./gridContainer";
import React from "react";

interface IWordTileProps {
  bytes: string;
  score: number;
}

interface INumberTileProps {
  score: number;
  small?: boolean;
}

interface ILetterTileProps {
  bytes: string;
  small?: boolean;
}

export const NumberTiles: React.FunctionComponent<INumberTileProps> =
  React.memo((props: INumberTileProps) => {
    return (
      <div className="tileContainer">
        {[...props.score.toString()].map((digit, index) => (
          <div
            key={index}
            className={props.small ? "tile tile7 number" : "tile number"}
          >
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
          <div
            key={index}
            className={props.small ? "tile tile7 letter" : "tile letter"}
          >
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
        {props.bytes ? (
          <LetterTiles bytes={props.bytes} small={props.score > threshold7} />
        ) : null}
        {props.score > 0 ? (
          <NumberTiles score={props.score} small={props.score > threshold7} />
        ) : null}
      </div>
    );
  }
);
