import React, { useEffect } from "react";
import { useState } from "react";
import CardWindow from "../../CardComponents/CardWindow";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { Question, Answer } from "../../../props/Props";
import { CardHeader, Card as UICard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { stat } from "fs";
interface Props {
  questions: Question[];
  okruhID: string;
}
/**
 * FlashCard zobrazuje otázky vo forme pamätových kariet.
 * @param {Props} props
 * @param {Question} props.questions - ID Pole otázok.
 * @param {string} props.okruhID - ID okruhu
 * @returns {JSX.Element} - Vracia funkčnú komponentu obrazovky Flash card.
 */
function FlashCard({ questions, okruhID }: Props) {
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_shown, setAnswer_shown] = useState(false);

  const { status, data: answers } = useQuery({
    queryKey: ["answers", questions[actual_question].id],
    queryFn: () => fetchAnswers(questions[actual_question].id),
  });

  function getQuestionID(position: number): string {
    return questions[position].id;
  }

  function nextQuestion() {
    if (actual_question < questions.length - 1) {
      set_ActualQuestion(actual_question + 1);
    } else {
      set_ActualQuestion(0);
    }
  }
  function previousQuestion(position: number) {
    if (position > 0) {
      set_ActualQuestion(position - 1);
    } else {
      set_ActualQuestion(questions.length - 1);
    }
  }
  if (status === "success")
    return (
      <UICard className="ui_card">
        <CardHeader className="cardHeader" style={{ height: "50%" }}>
          <CardWindow
            loading={false}
            itemShonw={answer_shown}
            question={questions.at(actual_question)}
            answers={answers}
            onClick={() => {
              setAnswer_shown(!answer_shown);
            }}
          ></CardWindow>
        </CardHeader>
        <div style={{ margin: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              style={{ margin: "10px", width: "40%" }}
              className="btn btn-outline-primary m1"
              onClick={() => {
                setAnswer_shown(false);
                previousQuestion(actual_question);
              }}
            >
              späť
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ margin: "10px", width: "40%" }}
              onClick={() => {
                setAnswer_shown(false);
                nextQuestion();
              }}
            >
              ďalej
            </button>
          </div>
          <h1 style={{ textAlign: "center" }}>
            {actual_question + 1}/{questions.length}
          </h1>
        </div>
      </UICard>
    );
  else
    return (
      <UICard className="ui_card">
        <CardHeader className="cardHeader" style={{ height: "50%" }}>
          <CardWindow
            loading={true}
            itemShonw={answer_shown}
            question={questions.at(actual_question)}
            answers={[]}
            onClick={() => {
              setAnswer_shown(!answer_shown);
            }}
          ></CardWindow>
        </CardHeader>
        <div className="card-body" style={{ margin: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              style={{ margin: "10px", width: "40%" }}
              className="btn btn-outline-primary m1"
              onClick={() => {
                setAnswer_shown(false);
                previousQuestion(actual_question);
              }}
            >
              späť
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ margin: "10px", width: "40%" }}
              onClick={() => {
                setAnswer_shown(false);
                nextQuestion();
              }}
            >
              ďalej
            </button>
          </div>
          <h1 style={{ textAlign: "center" }}>
            {actual_question + 1}/{questions.length}
          </h1>
        </div>
      </UICard>
    );
}
export default FlashCard;
