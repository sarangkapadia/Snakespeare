import React from "react";
import "./style/banner.css";

interface IBannerProps {
  text: string;
}
export const Banner: React.FunctionComponent<IBannerProps> = React.memo(
  (props) => {
    const { text } = props;

    return text !== "Text" ? (
      <div className="banner openBanner">{text}</div>
    ) : (
      <div className="banner closedBanner">{text}</div>
    );
  }
);
