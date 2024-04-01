import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnswerField } from "./AnswerField";
import { FieldValues } from "react-hook-form";
interface Props {
  question: Question;
  answers: Answer[];
  answer_number: string;
  actual_question: number;
  total_questions: number;
  onAnswerSelected: (selected: Answer) => void;
}
export const QuizCard = ({
  question,
  answers,
  answer_number,
  actual_question,
  total_questions,
  onAnswerSelected,
}: Props) => {
  const [isSelected, setSelected] = useState<Answer>();
  const [answer_selected, setAnswerSelected] = useState(false);
  const [colour, setColour] = useState("black");
  function isAnswerSelected(answer: Answer): string {
    if (answer.id == isSelected?.id) {
      if (answer.answer_type == true) {
        return "btn btn-success";
      } else return "btn btn-danger";
    } else {
      return "btn btn-primary";
    }
  }
  return (
    <>
      <CardHeader className="cardHeader">
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{ height: "100%", margin: "20px" }}
        >
          {!answer_selected && (
            <>
              <h1>{question.text}</h1>
            </>
          )}
          {answer_selected && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onAnswerSelected(isSelected!);
                  setAnswerSelected(false);
                }}
              >
                {" "}
                Ďalšia Otázka
              </button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent style={{ height: "50%" }}>
        {!question.is_text_question && (
          <div
            className=""
            style={{
              marginTop: "10px",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-evenly",
              height: "80%",
            }}
          >
            {answers.map((answer: Answer, index) => (
              <button
                className={isAnswerSelected(answer)}
                style={{
                  margin: "2px",
                  width: answer_number,
                  marginRight: "5px",
                  marginLeft: "5px",
                  maxHeight: "80px",
                }}
                key={answer.id}
                onClick={() => {
                  if (!answer_selected) {
                    setAnswerSelected(true);
                    setSelected(answer);
                  }
                }}
              >
                {answer.text}
              </button>
            ))}
          </div>
        )}
        {question.is_text_question && (
          <div style={{ height: "100%" }}>
            <AnswerField
              colour={colour}
              disabled={answer_selected}
              onSubmit={(field: FieldValues) => {
                if (
                  field.answer == answers[0].text &&
                  answers[0] != undefined
                ) {
                  if (!answer_selected) {
                    setAnswerSelected(true);
                    setSelected(answers[0]);
                    setColour("green");
                  }
                } else {
                  if (!answer_selected) {
                    setAnswerSelected(true);
                    const answer: Answer = {
                      id: answers[0].id + "wrong",
                      text: field.answer,
                      answer_type: false,
                      question: "",
                    };
                    setSelected(answer);
                    setColour("red");
                  }
                }
              }}
            ></AnswerField>
          </div>
        )}
      </CardContent>
      <CardFooter style={{ height: "10%" }}>
        <div>
          <h5 style={{ textAlign: "center" }}>
            {actual_question + 1}/{total_questions}
          </h5>
        </div>
      </CardFooter>
    </>
  );
};
