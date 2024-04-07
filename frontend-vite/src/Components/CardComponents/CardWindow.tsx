import React, { useEffect, useState } from "react";
import fetchAnswers from "../Downloaders/AnswersDownloader";
import { Question, Answer } from "@/src/props/Props";
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
      style={{
        height: "100%",
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      {!itemShonw && <h1>{question?.text}</h1>}
      {itemShonw && (
        <>
          {answers.map((answer: Answer, index) => (
            <>
              {" "}
              {answer.answer_type && (
                <h1 style={{ textAlign: "center" }}>{answer.text}</h1>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default FlashCardWindow;
