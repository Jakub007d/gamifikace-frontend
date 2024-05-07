import { Link } from "react-router-dom";
import ScoreUploader from "../Uploaders/ScoreUploader";
import { Answer, Question } from "@/src/props/Props";
import { useEffect } from "react";
interface Props {
  answers: Answer[];
  questions: Question[];
  score: number;
  is_challange: boolean;
  courseID: string;
  onSelectedQuestion: (questionID: string) => void;
}

/**
 * QuizSummary zobrazuje zhrnutie kvízu/výzvy.
 * @param {Props} props
 * @param {Answer[]} answers - Pole odpovedí.
 * @param {Question[]} questions - Pole otázok.
 * @param {Number} score - Získané skóre.
 * @param {Boolean} is_challange - Boolean určujúci či sa jedná o výzvu.
 * @param {string} courseID - ID kurzu.
 * @returns {JSX.Element} - Vracia funkčnú komponentu QuizSummary.
 */

export const QuizSummary = ({
  questions,
  answers,
  score,
  is_challange,
  courseID,
  onSelectedQuestion,
}: Props) => {
  ScoreUploader(courseID, score * 10);
  return (
    <div>
      {is_challange && <h1>Získané skóre: {score * 10}</h1>}
      <h1>
        Správnych odpovedí: {score}/{questions.length}
      </h1>
      {questions.map((question, index) => (
        <button
          type="button"
          className={
            (answers[index].answer_type && "btn btn-success") ||
            "btn btn-danger"
          }
          style={{ width: "98%", margin: "1%" }}
          onClick={() => onSelectedQuestion(question.id)}
        >
          {question.name} : {answers[index].text}{" "}
          {!answers[index].answer_type && "!"}
        </button>
      ))}
      <Link
        type="button"
        className="btn btn-primary"
        aria-current="page"
        to="/testOkruhs"
        style={{ width: "98%", margin: "1%" }}
      >
        Okruhy
      </Link>
    </div>
  );
};
