import React, { useEffect, useState } from "react";
import "../../style/modalPage.css";
import { ModalHeader } from "./modalHeader";

interface IModalPage {
  onClose: () => void;
  title: string;
}

export const ModalPage: React.FunctionComponent<IModalPage> = React.memo(
  (props) => {
    const { onClose, title } = props;
    const [className, setClassName] = useState("closed");

    useEffect(() => {
      setClassName(title !== "" ? "modalOverlayIn" : "modalOverlayOut");
      if (title === "") {
        setTimeout(() => setClassName("closed"), 400);
      }
    }, [title]);

    return props.children ? (
      <div className={className}>
        <div className={"modalContainer"}>
          <ModalHeader onClick={onClose} title={title} />
          {props.children}
        </div>
      </div>
    ) : null;
  }
);
