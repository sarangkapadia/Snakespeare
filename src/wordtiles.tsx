import "./style/wordTiles.css";
import "./style/tile.css";
interface IWordTileProps {
  bytes: string;
}
export const WordTiles: React.FunctionComponent<IWordTileProps> = (
  props: IWordTileProps
) => {
  return (
    <div className={"wordTilesContainer"}>
      {[...props.bytes].map((letter) => (
        <div className={"tile"}>{letter}</div>
      ))}
    </div>
  );
};
