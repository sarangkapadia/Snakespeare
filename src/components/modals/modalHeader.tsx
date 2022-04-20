import React from "react";
import { Title } from "../../title";
import "../../style/modalHeader.css";

interface IModalHeader {
  onClick: () => void;
  title: string;
}
export const ModalHeader: React.FunctionComponent<IModalHeader> = React.memo(
  (props) => {
    const { onClick, title } = props;
    return (
      <div className={"modalHeader"}>
        <div className={"titleContainer"}>
          <Title title={title} />
        </div>
        <button className={"close"} onClick={onClick}>
          X
        </button>
      </div>
    );
  }
);
