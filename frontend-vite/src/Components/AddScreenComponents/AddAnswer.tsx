import { Answer } from "@/src/props/Props";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  onAnswerCreated: (answer: Answer) => void;
}
export const AddAnswer = ({ onAnswerCreated }: Props) => {
  const [answer_text, set_answer_text] = useState("");
  const [answer_type, set_answer_type] = useState(false);
  let navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={() => {
          onAnswerCreated({
            id: "",
            text: answer_text,
            answer_type: answer_type,
            question: "",
          });
          navigate("/AddQuestion/AddScreen");
        }}
      >
        <label>
          Odpoveď:
          <input
            type="text"
            name={answer_text}
            onChange={(event) => {
              set_answer_text(event.target.value);
            }}
          />
        </label>
        <label className="switch">
          Správna odpoveď:
          <input
            type="checkbox"
            onChange={(event) => {
              set_answer_type(Boolean(event.target.value));
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
