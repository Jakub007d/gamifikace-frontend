import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchQuestionSpecific from "../../Downloaders/SpecificQuetionDownloader";
import { CardContent, CardHeader } from "@/components/ui/card";
import fetchAnswers from "../../Downloaders/AnswersDownloader";
import { Link } from "react-router-dom";
interface Props {
  questionID: string;
  is_challange: boolean;
}
export const QuestionDetail = ({ questionID, is_challange }: Props) => {
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
        <CardHeader className="cardHeader">
          <div
            className="d-flex border border-secondary rounded card-body justify-content-center"
            style={{ height: "100%", margin: "20px" }}
          >
            <h1>{question![0].text}</h1>
          </div>
        </CardHeader>
        <CardContent>
          {answers!.map((answer: Answer, index) => (
            <button
              className={isCorrect(answer)}
              style={{
                margin: "2px",
                width: "80%",
                marginRight: "5px",
                marginLeft: "5px",
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
                marginRight: "5px",
                marginLeft: "5px",
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
                marginRight: "5px",
                marginLeft: "5px",
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
