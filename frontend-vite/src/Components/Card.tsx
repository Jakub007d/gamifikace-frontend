import React, { useEffect } from "react";
import { useState } from "react";
interface Props {
  question: Question[];
}
interface Question {
  id: string;
  name: string;
  text: string;
  approved: boolean;
  visible: boolean;
  created_by: string;
  likes: Number;
  created_at: Date;
  okruh: string;
}
interface Answer {
  id: string;
  text: string;
  answer_type: boolean;
  question: string;
}

function Card({ question }: Props) {
  const [answers, setAnswers] = useState([]);
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_number, setAnswer_number] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const fetchAnswers = async (questionID: String) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/answer/querry?format=json&questionID=" +
          questionID
      );
      const data = await response.json();
      setAnswers(data);
      console.log(data);
      if (answer_number.length == 2 || answer_number.length == 1) {
        setAnswer_number("50%");
      } else {
        setAnswer_number("100%");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchAnswers(question[0].id);
  }, []);
  function isSelected(answer: Answer) {
    if (answer.id == selectedAnswer?.id) {
      if (answer.answer_type == true) return "btn btn-success";
      else return "btn btn-danger";
    } else {
      return "btn btn-primary";
    }
  }
  function nextQuestion(position: number) {
    if (position < question.length - 1) {
      set_ActualQuestion(position + 1);
      fetchAnswers(question[position + 1].id);
    } else {
      set_ActualQuestion(0);
      fetchAnswers(question[0].id);
    }
  }
  return (
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
      <div
        className="d-flex border border-secondary rounded card-body justify-content-center"
        style={{ height: "200px", margin: "20px" }}
      >
        <h1>{question[actual_question].text}</h1>
      </div>
      <div className="card-body">
        <h5 className="card-title">{question[actual_question].name}</h5>
        <p className="card-text">{question[actual_question].text}</p>
      </div>
      <div className="card-body">
        <div className="">
          {answers.map((answer: Answer, index) => (
            <button
              className={isSelected(answer)}
              style={{ width: answer_number, margin: "1px" }}
              key={answer.id}
              onClick={() => {
                setSelectedAnswer(answer);
                setTimeout(() => {
                  nextQuestion(actual_question);
                }, 450);
              }}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Card;
