import React, { useEffect, useState } from "react";
import { Card as UICard, CardHeader } from "@/components/ui/card";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MainAddScreen } from "../../AddScreenComponents/MainAddScreen";
import { AddAnswer } from "../../AddScreenComponents/AddAnswer";
import postQuestionWithAnswers from "../../Uploaders/QuestionUploader";
import { Answer, Okruh } from "@/src/props/Props";
import { useQuery } from "@tanstack/react-query";
import fetchOkruhs from "../../Downloaders/OkruhsDownloader";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
interface Props {
  lectionID: string;
  courseID: string;
}
/**
 * AddQuestionScreen je zobrazenie ktoré slúži ako rozhranie pre pridávanie novej otázky.
 * @param {object} props - objekt typu props.
 * @param {string} props.courseID - ID kurzu do ktorého bude pridávaná otázka.
 * @returns {JSX.Element} - Vracia komponentu AddQuestionScreen
 */
export const AddQuestionScreen = ({ courseID }: Props) => {
  const [newAnswers, addNewAnswers] = useState(Array<Answer>);
  const [answer_number, add_answer_number] = useState(0);
  const [question_name, add_question_name] = useState("");
  const [question_text, add_question_text] = useState("");
  const [lectionID, set_lectionID] = useState("");
  const {
    status,
    error,
    data: okruhs,
  } = useQuery({
    queryKey: ["okruhy", courseID],
    queryFn: () => fetchOkruhs(courseID),
  });
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/AddQuestion/AddScreen");
  }, []);
  return (
    <UICard className="ui_card">
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          paddingTop: "15px",
        }}
      >
        {window.location.pathname != "/AddQuestion/addAnswer" &&
          status === "success" && (
            <FormControl fullWidth style={{ width: "80%" }}>
              <InputLabel
                id="courses-label"
                style={{
                  backgroundColor: "white",
                }}
              >
                Okruh
              </InputLabel>
              <Select
                labelId="courses-label"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                }}
                className="center"
                id="okruhs"
                label="Okruh"
                value={lectionID}
                onChange={(selected) => set_lectionID(selected.target.value)}
              >
                {okruhs!.map((okruh: Okruh) => (
                  <MenuItem value={okruh.id}>{okruh.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        {window.location.pathname != "/AddQuestion/addAnswer" &&
          status === "pending" && <CircularProgress />}
      </CardHeader>

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
                navigate("/Courses");
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
