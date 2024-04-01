import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import fetchQuestions from "../../Downloaders/QuestionsDownloader";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { QuizSummary } from "../../QuizComponents/QuizSummary";
import { QuizCard } from "../../QuizComponents/QuizCard";
import { Card as UICard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
interface Props {
  lectionID: string;
}

function Card({ lectionID }: Props) {
  const [answers, setAnswers] = useState(Array<Answer>);
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_number, setAnswer_number] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [questions, setQuestions] = useState(Array<Question>);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array<Answer>);
  let navigate = useNavigate();
  function getQuestionID(position: number): string {
    return questions[position].id;
  }
  async function getQusetionsAndAnswers(lectionID: string) {
    fetchQuestions(lectionID).then((response: Question[]) => {
      fetchAnswers(response[0].id).then((fetchedAnswers: Answer[]) => {
        setAnswers(fetchedAnswers);
        setQuestions(response);
        if (fetchedAnswers.length > 2) {
          setAnswer_number("80%");
        } else {
          setAnswer_number("49%");
        }
        navigate("/Quiz/QuizCard");
      });
    });
  }
  async function getAnswers(questionID: string) {
    const fetchedAnswers: Answer[] = await fetchAnswers(questionID);
    setAnswers(fetchedAnswers);
    if (fetchedAnswers.length > 2) {
      setAnswer_number("100%");
    } else {
      setAnswer_number("45%");
    }
  }
  useEffect(() => {
    getQusetionsAndAnswers(lectionID);
  }, []);
  function isCorrect(answer: Answer) {
    if (answer.answer_type == true) {
      setScore(score + 1);
    }
  }
  const {
    status,
    error,
    data: questions2,
  } = useQuery({
    queryKey: ["otázky", lectionID],
    queryFn: () => fetchQuestions(lectionID),
  });
  const { status: statusQuestions, data: answers2 } = useQuery({
    enabled: status === "success",
    queryKey: ["answers", questions[actual_question].id],
    queryFn: () => fetchQuestions(questions[actual_question].id),
  });

  function nextQuestion(answer: Answer) {
    isCorrect(answer);
    setSelectedAnswers((selectedAnswers) => [...selectedAnswers, answer]);
    if (actual_question < questions.length - 1) {
      set_ActualQuestion(actual_question + 1);
      getAnswers(questions[actual_question + 1].id);
    } else {
      set_ActualQuestion(0);
      getAnswers(questions[0].id);
      navigate("/Quiz/Summary");
    }
  }
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
              question={questions[actual_question]}
              answers={answers}
              answer_number={answer_number}
              actual_question={actual_question}
              total_questions={questions.length}
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
              questions={questions}
              answers={selectedAnswers}
              score={score}
            />
          }
        />
      </Routes>
    </UICard>
  );
}
export default Card;
