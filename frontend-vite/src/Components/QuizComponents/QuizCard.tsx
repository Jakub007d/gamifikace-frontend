import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
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
import { Answer, Question } from "@/src/props/Props";
import { Scale } from "lucide-react";
interface Props {
  question: Question;
  answers: Answer[];
  answer_number: string;
  actual_question: number;
  total_questions: number;
  onAnswerSelected: (selected: Answer) => void;
}
/**
 * QuizCard zobrazuje jednotlivú kartu kvízu.
 * @param props
 * @param question Otázka, ktorá sa má zobraziť.
 * @param answers Pole odpovedí na danú otázku.
 * @param answer_number Číslo odpovede, ktoré má byť zobrazené.
 * @param actual_question Index aktuálnej otázky.
 * @param total_questions Celkový počet otázok.
 * @param onAnswerSelected Funkcia volaná po zvolení odpovede.
 */
export const QuizCard = ({
  question,
  answers,
  answer_number,
  actual_question,
  total_questions,
  onAnswerSelected,
}: Props) => {
  const [isSelected, setSelected] = useState<Answer>();
  const [selected_state, set_selected_state] = useState(false);
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
      <CardHeader
        className="cardHeader"
        style={{ height: "40%", margin: "10px" }}
      >
        <div>
          <h5 style={{ textAlign: "center", height: "8%" }}>
            {actual_question + 1}/{total_questions}
          </h5>
        </div>
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{ height: "80%" }}
        >
          {!answer_selected && (
            <>
              <h1>{question.text}</h1>
            </>
          )}
          {answer_selected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "80%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  width: "80%",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "20px",
                }}
              >
                {selected_state && (
                  <h2
                    style={{
                      textAlign: "center",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    🎉Správne🎉
                  </h2>
                )}
                {!selected_state && (
                  <h2
                    style={{
                      textAlign: "center",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    🙁Nesprávne🙁
                  </h2>
                )}
                {/*
                <ThumbUpIcon
                  style={{ height: "50px", width: "50px" }}
                ></ThumbUpIcon>
                <ThumbDownIcon
                  style={{ height: "50px", width: "50px" }}
                ></ThumbDownIcon>
              */}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent style={{ height: "45%" }}>
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
                    set_selected_state(answer.answer_type);
                  }
                }}
              >
                {answer.text}
              </button>
            ))}
          </div>
        )}
        {question.is_text_question && (
          <div style={{ height: "80%" }}>
            <AnswerField
              colour={colour}
              disabled={answer_selected}
              onSubmit={(field: FieldValues) => {
                if (
                  field.answer.toUpperCase() == answers[0].text.toUpperCase() &&
                  answers[0] != undefined
                ) {
                  if (!answer_selected) {
                    setAnswerSelected(true);
                    setSelected(answers[0]);
                    set_selected_state(answers[0].answer_type);
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
                    set_selected_state(answer.answer_type);
                    setColour("red");
                  }
                }
              }}
            ></AnswerField>
          </div>
        )}
      </CardContent>
      <CardFooter
        style={{ height: "15%", display: "flex", flexDirection: "column" }}
      >
        {answer_selected && (
          <>
            <button
              style={{
                height: "50%",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              className="btn btn-primary"
              onClick={() => {
                onAnswerSelected(isSelected!);
                setAnswerSelected(false);
              }}
            >
              Ďalšia Otázka
            </button>
          </>
        )}
      </CardFooter>
    </>
  );
};
