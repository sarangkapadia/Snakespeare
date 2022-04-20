import React, { useEffect, useState } from "react";
import "../../style/modalPage.css";
import { ModalHeader } from "./modalHeader";

interface IModalPage {
  action: boolean;
  onClose: () => void;
  title: string;
}

export const ModalPage: React.FunctionComponent<IModalPage> = React.memo(
  (props) => {
    const { action, onClose, title } = props;
    const [className, setClassName] = useState("closed");

    useEffect(() => {
      setClassName(action ? "modalOverlayIn" : "modalOverlayOut");
      if (!action) {
        setTimeout(() => setClassName("closed"), 400);
      }
    }, [action]);

    useEffect(() => {
      setClassName("closed");
    }, []);

    return (
      <div className={className}>
        <div className={"modalContainer"}>
          <ModalHeader onClick={onClose} title={title} />
          {props.children}
        </div>
      </div>
    );
  }
);
