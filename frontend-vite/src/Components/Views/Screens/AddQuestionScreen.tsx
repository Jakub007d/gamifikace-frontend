import React, { useEffect, useState } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MainAddScreen } from "../../AddScreenComponents/MainAddScreen";
import { AddAnswer } from "../../AddScreenComponents/AddAnswer";
import postQuestionWithAnswers from "../../Uploaders/QuestionUploader";
import { Answer } from "@/src/props/Props";
interface Props {
  lectionID: string;
}
export const AddQuestionScreen = ({ lectionID }: Props) => {
  const [newAnswers, addNewAnswers] = useState(Array<Answer>);
  const [answer_number, add_answer_number] = useState(0);
  const [question_name, add_question_name] = useState("");
  const [question_text, add_question_text] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/AddQuestion/AddScreen");
  }, []);
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
      <Link to="/AddQuestion/AddScreen">HERE</Link>
      <Routes>
        <Route
          path="/AddScreen"
          element={
            <MainAddScreen
              newAnswers={newAnswers}
              answerNumber={answer_number}
              question_name={question_name}
              question_text={question_text}
              setQuestionName={(name) => add_question_name(name)}
              setQuestionText={(text) => add_question_text(text)}
              onSubmit={() => {
                postQuestionWithAnswers(
                  newAnswers.length == 1,
                  question_name,
                  question_text,
                  lectionID,
                  newAnswers
                );
              }}
            />
          }
        />
        <Route
          path="/AddAnswer"
          element={
            <AddAnswer
              onAnswerCreated={(answer: Answer) => {
                addNewAnswers((oldAnswers) => [...oldAnswers, answer]);
                add_answer_number(newAnswers.length);
              }}
            />
          }
        />
      </Routes>
    </UICard>
  );
};
