import { CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import add_icon from "./icons/add_icon.svg";
import { Link } from "react-router-dom";
import { QuestionField } from "./QuestionField";
import postQuestionWithAnswers from "../Uploaders/QuestionUploader";
import { Answer } from "@/src/props/Props";
interface Props {
  newAnswers: Answer[];
  answerNumber: number;
  question_name: string;
  question_text: string;
  setQuestionName: (name: string) => void;
  setQuestionText: (text: string) => void;
  onSubmit: () => void;
}
//Hlavná pridávacia obrazovka otázky.
export const MainAddScreen = ({
  newAnswers,
  answerNumber,
  question_name,
  question_text,
  setQuestionName,
  setQuestionText,
  onSubmit,
}: Props) => {
  const answerCorrect = (answer: Answer) => {
    if (answer.answer_type) return "btn btn-success";
    else return "btn btn-danger";
  };
  return (
    <>
      <CardHeader
        className="cardHeader"
        style={{
          height: "30%",
          width: "100%",
        }}
      >
        <div
          className="d-flex  card-body justify-content-center"
          style={{
            height: "100%",
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <QuestionField
            question_name={question_name}
            question_text={question_text}
            set_question_name={(name) => setQuestionName(name)}
            set_question_text={(text) => setQuestionText(text)}
          />
        </div>
      </CardHeader>
      <CardContent
        style={{
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {newAnswers.map((answer: Answer) => (
          <Link
            to="/addAnswer"
            className={answerCorrect(answer)}
            style={{
              width: "80%",
              marginTop: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {answer.text}
          </Link>
        ))}
        {answerNumber < 3 && (
          <Link
            to="/AddQuestion/addAnswer"
            className="btn btn-primary"
            style={{
              width: "80%",
              marginTop: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Pridať Odpoveď
          </Link>
        )}
        <button
          className="btn btn-primary"
          style={{
            width: "80%",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={onSubmit}
        >
          Hotovo
        </button>
      </CardContent>
    </>
  );
};
