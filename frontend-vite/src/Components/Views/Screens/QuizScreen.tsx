import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { QuizSummary } from "../../QuizComponents/QuizSummary";
import { QuizCard } from "../../QuizComponents/QuizCard";
import {
  CardContent,
  CardFooter,
  CardHeader,
  Card as UICard,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CommentScreen } from "./CommentScreen";
import { QuestionDetail } from "./QuestionDetail";
import { FieldValues } from "react-hook-form";
import { Question, Answer } from "@/src/props/Props";
import { CircularProgress } from "@mui/material";
interface Props {
  /** Pole objektov typu otázka */
  questions: Question[];
  /** Boolean udávajúci či sa jedná o hodnotenú otázku */
  is_challange: boolean;
  /** ID kurzu je využívané pri pripisovaní bodov za výzvu */
  courseID: string;
}
/**
 * QuizScreen komponent slúži ako rozhranie pre vykrealovanie kvízových otázok.
 * @param {Props} props
 * @param {Question[]} props.questions - Pole jednotlivých kvízových otázok daného kvízu.
 * @param {boolean} props.is_challange - Boolean udávajúci či sa jedná o výzvu alebo len o študíjny quiz.
 * @param {string} props.courseID - ID kurzu.
 * @returns {JSX.Element} - Vracia funkčnú komponentu QuizScreen.
 */
function QuizScreen({ questions, is_challange, courseID }: Props) {
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_number, setAnswer_number] = useState("");
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array<Answer>);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  let navigate = useNavigate();
  function isCorrect(answer: Answer) {
    if (answer.answer_type == true) {
      var new_score = score + 1;
      setScore(new_score);
    }
  }
  const { status, data: answers } = useQuery({
    queryKey: ["answers", questions[actual_question].id],
    queryFn: () => fetchAnswers(questions[actual_question].id),
  });
  useEffect(() => {
    if (!is_challange) navigate("/Quiz/QuizCard");
    else navigate("/Challange/QuizCard");
  }, [answers]);
  useEffect(() => {
    if (answers?.length !== undefined) {
      if (answers.length > 2) setAnswer_number("95%");
      else setAnswer_number("45%");
    }
  }, [answers]);
  function nextQuestion(answer: Answer) {
    isCorrect(answer);
    setSelectedAnswers((selectedAnswers) => [...selectedAnswers, answer]);
    if (actual_question < questions.length - 1) {
      set_ActualQuestion(actual_question + 1);
    } else {
      if (!is_challange) navigate("/Quiz/Summary");
      else {
        navigate("/Challange/Summary");
      }
    }
  }
  if (status === "success") {
    return (
      <UICard className="ui_card">
        <Routes>
          <Route
            path=":QuizCard"
            element={
              <QuizCard
                answer_number={answer_number}
                question={questions![actual_question]}
                answers={answers!}
                actual_question={actual_question}
                total_questions={questions!.length}
                onAnswerSelected={(selectedAnswer: Answer) => {
                  nextQuestion(selectedAnswer);
                }}
              />
            }
          />
          <Route
            path="/Summary"
            element={
              <QuizSummary
                questions={questions!}
                answers={selectedAnswers}
                score={score}
                is_challange={is_challange}
                courseID={courseID}
                onSelectedQuestion={(selected) => {
                  setSelectedQuestion(selected);
                  if (!is_challange) navigate("/Quiz/Detail");
                  else navigate("/Challange/Detail");
                }}
              ></QuizSummary>
            }
          />
          <Route
            path="/Detail"
            element={
              <QuestionDetail
                questionID={selectedQuestion}
                is_challange={is_challange}
              />
            }
          />
          <Route
            path="/Comments"
            element={
              <CommentScreen
                is_challange={is_challange}
                questionID={selectedQuestion}
                onSubmit={(vals: FieldValues) => {}}
              />
            }
          />
        </Routes>
      </UICard>
    );
  } else
    return (
      <>
        <CardHeader className="cardHeader" style={{ height: "50%" }}>
          <div
            className="d-flex border border-secondary rounded card-body justify-content-center"
            style={{ height: "100%", margin: "20px", minHeight: "250px" }}
          >
            <CircularProgress />
          </div>
        </CardHeader>
        <CardContent style={{ height: "50%" }}>
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
            <button
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "5px",
                marginLeft: "5px",
                maxHeight: "80px",
                height: "50px",
              }}
              className="btn btn-secondary"
              disabled
            ></button>
            <button
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "5px",
                marginLeft: "5px",
                maxHeight: "80px",
                height: "50px",
              }}
              className="btn btn-secondary"
              disabled
            ></button>
            <button
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "5px",
                marginLeft: "5px",
                maxHeight: "80px",
                height: "50px",
              }}
              className="btn btn-secondary"
              disabled
            ></button>
            <button
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "5px",
                marginLeft: "5px",
                maxHeight: "80px",
                height: "50px",
              }}
              className="btn btn-secondary"
              disabled
            ></button>
          </div>
        </CardContent>
        <CardFooter style={{ height: "10%" }}>
          <div>
            <h5 style={{ textAlign: "center" }}>0/0</h5>
          </div>
        </CardFooter>
      </>
    );
}
export default QuizScreen;
