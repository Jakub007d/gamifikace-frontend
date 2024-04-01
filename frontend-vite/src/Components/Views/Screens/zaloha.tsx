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
interface Props {
  lectionID: string;
}

function Card({ lectionID }: Props) {
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_number, setAnswer_number] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array<Answer>);
  let navigate = useNavigate();
  function getQuestionID(position: number): string {
    return questions![position].id;
  }

  function isCorrect(answer: Answer) {
    if (answer.answer_type == true) {
      setScore(score + 1);
    }
  }
  const {
    status,
    error,
    data: questions,
  } = useQuery({
    queryKey: ["questions", "2"],
    queryFn: () => fetchQuestions("1"),
  });
  const { status: statusQuestions, data: answers } = useQuery({
    enabled: questions === undefined,
    queryKey: ["answers", questions![actual_question].id],
    queryFn: () => fetchAnswers(questions![actual_question].id),
  });
  useEffect(() => {
    navigate("/Quiz/QuizCard");
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
    if (actual_question < questions!.length - 1) {
      set_ActualQuestion(actual_question + 1);
    } else {
      navigate("/Quiz/Summary");
    }
  }
  if (status === "success" && statusQuestions === "success") {
    return (
      <UICard
        style={{
          minWidth: "500px",
          maxWidth: "700px",
          height: "100vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
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
