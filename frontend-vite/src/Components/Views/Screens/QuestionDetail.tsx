import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchQuestionSpecific from "../../Downloaders/SpecificQuetionDownloader";
import { CardContent, CardHeader } from "@/components/ui/card";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { Link, useNavigate } from "react-router-dom";
import { Answer } from "@/src/props/Props";
import back_icon from "./icon/back.svg";
interface Props {
  questionID: string;
  is_challange: boolean;
}
export const QuestionDetail = ({ questionID, is_challange }: Props) => {
  let navigate = useNavigate();
  function isCorrect(answer: Answer) {
    if (answer.answer_type) return "btn btn-outline-success";
    else return "btn btn-outline-danger";
  }
  const {
    status,
    error,
    data: question,
  } = useQuery({
    queryKey: ["question", questionID],
    queryFn: () => fetchQuestionSpecific(questionID),
  });
  const {
    status: answer_status,
    error: answer_error,
    data: answers,
  } = useQuery({
    queryKey: ["answers", questionID],
    queryFn: () => fetchAnswers(questionID),
  });

  if (status === "pending" || answer_status === "pending") {
    return (
      <CardHeader className="cardHeader">
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{ height: "100%", margin: "20px" }}
        >
          <h1>Načítanie...</h1>
        </div>
      </CardHeader>
    );
  }
  if (status === "error" || answer_status === "error") {
    return (
      <CardHeader className="cardHeader">
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{ height: "100%", margin: "20px" }}
        >
          <h1>Error</h1>
        </div>
      </CardHeader>
    );
  } else if (status === "success" && answer_status === "success") {
    return (
      <>
        <div style={{ height: "50px", backgroundColor: "lightblue" }}>
          <img
            src={back_icon}
            style={{ height: "100%" }}
            onClick={() => {
              if (!is_challange) {
                navigate("/Quiz/Summary");
              } else {
                navigate("/Challange/Summary");
              }
            }}
          ></img>
        </div>
        <CardHeader className="cardHeader" style={{ marginBottom: "20px" }}>
          <div
            className="d-flex border border-secondary rounded card-body justify-content-center"
            style={{ height: "100%", margin: "20px" }}
          >
            <h1>{question![0].text}</h1>
          </div>
        </CardHeader>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {answers!.map((answer: Answer, index) => (
            <button
              className={isCorrect(answer)}
              style={{
                margin: "10px",
                width: "80%",
                marginRight: "auto",
                marginLeft: "auto",
                maxHeight: "80px",
              }}
              key={answer.id}
              disabled
            >
              {answer.text}
            </button>
          ))}
          {is_challange && (
            <Link
              className="btn btn-primary"
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "auto",
                marginLeft: "auto",
                maxHeight: "80px",
              }}
              to="/Challange/Comments"
            >
              Komentáre
            </Link>
          )}
          {!is_challange && (
            <Link
              className="btn btn-primary"
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "auto",
                marginLeft: "auto",
                maxHeight: "80px",
              }}
              to="/Quiz/Comments"
            >
              Komentáre
            </Link>
          )}
        </CardContent>
      </>
    );
  } else return <h5>ERROR</h5>;
};
