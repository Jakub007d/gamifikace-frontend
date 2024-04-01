import React, { useEffect, useState } from "react";
import fetchAnswers from "../Downloaders/AnswersDownloader";
interface Props {
  children?: JSX.Element | JSX.Element[];
}
const GenericCardWindow = ({ children }: Props) => {
  return (
    <div
      className="d-flex border border-secondary rounded card-body justify-content-center"
      style={{ height: "20%", margin: "20px" }}
    >
      {children}
    </div>
  );
};

export default GenericCardWindow;
