import React, { useEffect, useState } from "react";
import fetchAnswers from "../Downloaders/AnswersDownloader";
interface Props {
  children?: JSX.Element | JSX.Element[];
  itemShonw: boolean;
  question: Question | undefined;
  answers: Answer[];
  onClick: () => void;
}
const FlashCardWindow = ({ itemShonw, question, answers, onClick }: Props) => {
  return (
    <div
      className="d-flex border border-secondary rounded card-body justify-content-center"
      style={{ height: "20%", margin: "20px" }}
      onClick={onClick}
    >
      {!itemShonw && <h1>{question?.text}</h1>}
      {itemShonw && (
        <div>
          {answers.map((answer: Answer, index) => (
            <div>{answer.answer_type && <p>{answer.text}</p>}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashCardWindow;
