import "./style/wordTiles.css";
import "./style/tile.css";
import React from "react";
interface IWordTileProps {
  bytes: string;
}
export const WordTiles: React.FunctionComponent<IWordTileProps> = React.memo(
  (props: IWordTileProps) => {
    return (
      <div className={"wordTilesContainer"}>
        {[...props.bytes].map((letter, index) => (
          <div key={index} className={"tile"}>
            {letter}
          </div>
        ))}
      </div>
    );
  }
);
