import React, { Children } from "react";
import { Link } from "react-router-dom";
interface Props {
  text: string;
  onSelected: () => void;
  directory: string;
}
export const NavigationButton = ({ onSelected, directory, text }: Props) => {
  return (
    <Link
      onClick={() => onSelected()}
      to={directory}
      className="btn btn-primary"
      style={{
        width: "80%",
        margin: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {text}
    </Link>
  );
};
