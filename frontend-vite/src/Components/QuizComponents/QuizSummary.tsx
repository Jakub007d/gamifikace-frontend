import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScoreUploader from "../Uploaders/ScoreUploader";
import { Answer, Question } from "@/src/props/Props";
import back_icon from "./icon/back.svg";
interface Props {
  answers: Answer[];
  questions: Question[];
  score: number;
  is_challange: boolean;
  courseID: string;
  onSelectedQuestion: (questionID: string) => void;
}
export const QuizSummary = ({
  questions,
  answers,
  score,
  is_challange,
  courseID,
  onSelectedQuestion,
}: Props) => {
  let navigate = useNavigate();
  return (
    <div>
      <div style={{ height: "50px", backgroundColor: "lightblue" }}>
        <img
          src={back_icon}
          style={{ height: "100%" }}
          onClick={() => {
            navigate("/Courses");
          }}
        ></img>
      </div>
      {is_challange && <h1>Získané skóre: {score * 10}</h1>}
      <h1>
        Správnych odpovedí: {score}/{questions.length}
      </h1>
      {questions.map((question, index) => (
        <button
          type="button"
          className={
            (answers[index].answer_type && "btn btn-success") ||
            "btn btn-danger"
          }
          style={{ width: "98%", margin: "1%" }}
          onClick={() => onSelectedQuestion(question.id)}
        >
          {question.name} : {answers[index].text}{" "}
          {!answers[index].answer_type && "!"}
        </button>
      ))}
      <Link
        type="button"
        className="btn btn-primary"
        aria-current="page"
        to="/testOkruhs"
        style={{ width: "98%", margin: "1%" }}
      >
        Okruhy
      </Link>
    </div>
  );
};
