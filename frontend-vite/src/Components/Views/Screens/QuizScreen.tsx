import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import fetchQuestions from "../../Downloaders/QuestionsDownloader";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { QuizSummary } from "../../QuizComponents/QuizSummary";
import { QuizCard } from "../../QuizComponents/QuizCard";
import { Card as UICard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import MobileBasicView from "../MobileView/MobileBasicView";
import { stringify } from "querystring";
import { randomUUID } from "crypto";
import { LoginScreen } from "./LoginScreen";
import { CommentScreen } from "./CommentScreen";
import ScoreUploader from "../../Uploaders/ScoreUploader";
import { QuestionDetail } from "./QuestionDetail";
import { FieldValues } from "react-hook-form";
import { Question, Answer } from "@/src/props/Props";
interface Props {
  questions: Question[];
  is_challange: boolean;
  courseID: string;
}

function Card({ questions, is_challange, courseID }: Props) {
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_number, setAnswer_number] = useState("");
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array<Answer>);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  let navigate = useNavigate();
  function isCorrect(answer: Answer) {
    if (answer.answer_type == true) {
      setScore(score + 1);
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
        ScoreUploader(courseID, score * 50);
        navigate("/Challange/Summary");
      }
    }
  }
  if (status === "success") {
    return (
      <UICard className="ui_card">
        {/* A JSX comment 
    <div
    
      className="card"
      style={{
        width: "100%",
        margin: "10px",
        maxWidth: "500px",
        minWidth: "350px",
        height: "100vh",
        minHeight: "403px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
    */}
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
                onSubmit={(vals: FieldValues) => {
                  alert(vals.comment);
                }}
              />
            }
          />
        </Routes>
      </UICard>
    );
  } else
    return (
      <MobileBasicView>
        <h1>Loading...</h1>
      </MobileBasicView>
    );
}
export default Card;
