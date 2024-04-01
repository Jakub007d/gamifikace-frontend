import React, { useEffect } from "react";
import { useState } from "react";
import CardWindow from "./CardComponents/CardWindow";
import fetchAnswers from "./Downloaders/AnswersDownloader";
import MobileBasicView from "./Views/MobileView/MobileBasicView";
import fetchQuestions from "./Downloaders/QuestionsDownloader";
interface Props {
  question: Question[];
  okruhID: string;
}
function FlashCard({ question, okruhID }: Props) {
  const [answers, setAnswers] = useState(Array<Answer>);
  const [actual_question, set_ActualQuestion] = useState(0);
  const [answer_shown, setAnswer_shown] = useState(false);
  const [questions, setQuestions] = useState(Array<Question>);

  async function getAnswers(QuestionID: string) {
    const fetched: Answer[] = await fetchAnswers(QuestionID);
    setAnswers(fetched);
  }
  async function getQusetionsAndAnswers(lectionID: string) {
    fetchQuestions(lectionID).then((response: Question[]) => {
      fetchAnswers(response[0].id).then((fetchedAnswers: Answer[]) => {
        setAnswers(fetchedAnswers);
        setQuestions(response);
      });
    });
  }
  function getQuestionID(position: number): string {
    return questions[position].id;
  }
  useEffect(() => {
    getQusetionsAndAnswers(okruhID);
  }, []);
  function nextQuestion() {
    if (actual_question < questions.length - 1) {
      set_ActualQuestion(actual_question + 1);
      getAnswers(getQuestionID(actual_question + 1));
    } else {
      set_ActualQuestion(0);
      getAnswers(getQuestionID(0));
    }
  }
  function previousQuestion(position: number) {
    if (position > 0) {
      set_ActualQuestion(position - 1);
      getAnswers(questions[position - 1].id);
    } else {
      set_ActualQuestion(0);
      getAnswers(questions[0].id);
    }
  }
  return (
    <MobileBasicView>
      <CardWindow
        itemShonw={answer_shown}
        question={questions.at(actual_question)}
        answers={answers}
        onClick={() => {
          setAnswer_shown(!answer_shown);
        }}
      ></CardWindow>
      <div className="card-body">
        <button
          type="button"
          style={{ margin: "10px", width: "45%" }}
          className="btn btn-outline-primary m1"
          onClick={() => {
            setAnswer_shown(false);
            previousQuestion(actual_question);
          }}
        >
          previous
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ margin: "10px", width: "45%" }}
          onClick={() => {
            setAnswer_shown(false);
            nextQuestion();
          }}
        >
          next
        </button>
      </div>
    </MobileBasicView>
  );
}
export default FlashCard;
