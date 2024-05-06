import React, { Children } from "react";
import { Link } from "react-router-dom";
interface Props {
  text: string;
  onSelected: () => void;
  directory: string;
}
/**
 * NavigationButton navigačné tlačítko.
 * @param {Props} props
 * @param {string} props.directory - Cieľ v tvare URL.
 * @param {Funciton} props.onSelected - Callback funcia zavolaná pri kliknutí na komponent.
 * * @param {string} props.text - Text tlačítka.
 * @returns {JSX.Element} - Vracia funkčnú komponentu NavigationButton.
 */
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
