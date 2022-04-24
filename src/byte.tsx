import React from "react";
import "./style/byte.css";

interface IByteProps {
  letter: string;
}
export const Byte: React.FunctionComponent<IByteProps> = React.memo((props) => {
  const { letter } = props;
  return <div className="byteLetter">{letter}</div>;
});
