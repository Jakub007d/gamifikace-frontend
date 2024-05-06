import { Answer } from "@/src/props/Props";
import { Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  onAnswerCreated: (answer: Answer) => void;
}
//Zobrazenie pre pridávanie otázky.
export const AddAnswer = ({ onAnswerCreated }: Props) => {
  const [answer_text, set_answer_text] = useState("");
  const [answer_type, set_answer_type] = useState(false);
  let navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div style={{ marginTop: "10px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
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
        <label style={{ width: "80%" }}>
          <TextField
            style={{ width: "100%" }}
            id="answer"
            label="Odpoveď"
            variant="outlined"
            name={answer_text}
            onChange={(event) => {
              set_answer_text(event.target.value);
            }}
          />
        </label>
        <label className="switch">
          Správna odpoveď:
          <Switch
            {...label}
            onChange={(event) => {
              set_answer_type(Boolean(event.target.value));
            }}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          disabled={answer_text == ""}
          className="btn btn-primary"
        />
      </form>
    </div>
  );
};
