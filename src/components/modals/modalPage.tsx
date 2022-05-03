import React, { useEffect, useState } from "react";
import "../../style/modalPage.css";
import { ModalHeader } from "./modalHeader";

interface IModalPage {
  onClose: () => void;
  title: string;
  isWindow: boolean;
}

export const ModalPage: React.FunctionComponent<IModalPage> = React.memo(
  (props) => {
    const { onClose, title, isWindow } = props;
    const [className, setClassName] = useState("closed");
    const [containerClassName, setContainerClassName] = useState(
      "floatingContainerWindow"
    );

    useEffect(() => {
      if (title !== "") {
        setClassName("modalOverlayIn");
      }
      if (isWindow) {
        setContainerClassName("floatingContainerWindow");
      } else {
        setContainerClassName("floatingContainerFullScreen");
      }
    }, [title, isWindow]);

    return props.children ? (
      <div className={className}>
        <div className={containerClassName}>
          <ModalHeader onClick={onClose} title={title} />
          {props.children}
        </div>
      </div>
    ) : null;
  }
);
