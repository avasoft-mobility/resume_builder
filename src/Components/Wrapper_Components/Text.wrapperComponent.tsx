import { Typography } from "@mui/material";
import React, { CSSProperties } from "react";

interface TextProps {
  children: any;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  color: string;
  style?: CSSProperties;
}
const Text: React.FC<TextProps> = (props) => {
  return (
    <Typography
      gutterBottom={props.gutterBottom}
      noWrap={props.noWrap}
      paragraph={props.paragraph}
      variant={props.variant}
      color={props.color}
      style={props.style}
    >
      {props.children}
    </Typography>
  );
};

export default Text;
