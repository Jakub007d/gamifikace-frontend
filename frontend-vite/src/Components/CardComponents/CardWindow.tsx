import React, { useEffect, useState } from "react";
import fetchAnswers from "../Downloaders/AnswersDownloader";
import { Question, Answer } from "@/src/props/Props";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import { CircularProgress } from "@mui/material";
interface Props {
  children?: JSX.Element | JSX.Element[];
  itemShonw: boolean;
  loading: boolean;
  question: Question | undefined;
  answers: Answer[];
  onClick: () => void;
}
/**
 * FlashCardWindow okno karty Flashcard.
 * @param {Props} props
 * @param {string} props.itemShonw - Určuje či je odpoveď ukázaná.
 * @param {string} props.question - Otázka.
 * @param {string} props.answers - Správna odpoveď.
 * @param {boolean} props.loading - True pokiaľ sa stahujú odpovede.
 * @returns {JSX.Element} - Vracia funkčnú komponentu NavigationButton.
 */
const FlashCardWindow = ({
  itemShonw,
  question,
  answers,
  loading,
  onClick,
}: Props) => {
  return (
    <div
      className="d-flex border border-secondary rounded card-body justify-content-center"
      style={{
        height: "100%",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      {!itemShonw && <h1>{question?.text}</h1>}
      {itemShonw && !loading && (
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
      {itemShonw && loading && (
        <>
          <CircularProgress />
        </>
      )}
      <TouchAppOutlinedIcon fontSize="large"></TouchAppOutlinedIcon>
    </div>
  );
};

export default FlashCardWindow;
