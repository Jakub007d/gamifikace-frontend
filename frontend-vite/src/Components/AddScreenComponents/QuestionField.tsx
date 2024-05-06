import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextField } from "@mui/material";
interface Props {
  set_question_name: (question_name: string) => void;
  set_question_text: (question_text: string) => void;
  question_name: string;
  question_text: string;
}
/**
 * QuestionField formulár pre zadanie údajov novej otázky.
 * @param {Props} props
 * @param {Function} props.set_question_name - Callback funkcia pre nastavenie mena otázky.
 * @param {Function} props.set_question_text - Callback funkcia pre nastavenie textu otázky.
 * @param {string} props.question_name - Meno otázky.
 * @param {string} props.question_text - Text otázky
 * @returns {JSX.Element} - Vracia funkčnú komponentu QuestionField.
 */
export const QuestionField = ({
  set_question_name,
  set_question_text,
  question_name,
  question_text,
}: Props) => {
  return (
    <form
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <label style={{ height: "40%" }}>
        <TextField
          style={{ width: "100%", height: "100%" }}
          name="question_name"
          id="question-id"
          label="Názov otázky"
          variant="outlined"
          value={question_name}
          onChange={(event) => {
            set_question_name(event.target.value);
          }}
        />
      </label>
      <label style={{ height: "60 %" }}>
        <TextField
          style={{ width: "100%" }}
          id="question-text"
          label="Text Otázky"
          variant="outlined"
          type="text"
          name="question_text"
          multiline
          rows={4}
          value={question_text}
          onChange={(event) => {
            set_question_text(event.target.value);
          }}
        />
      </label>
    </form>
  );
};
