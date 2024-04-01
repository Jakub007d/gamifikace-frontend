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
interface Props {
  set_question_name: (question_name: string) => void;
  set_question_text: (question_text: string) => void;
  question_name: string;
  question_text: string;
}
export const QuestionField = ({
  set_question_name,
  set_question_text,
  question_name,
  question_text,
}: Props) => {
  return (
    <form style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <label>
        {question_name == "" && (
          <input
            type="text"
            name="question_name"
            style={{ width: "100%" }}
            placeholder="Názov otázky"
            onChange={(event) => {
              set_question_name(event.target.value);
            }}
          />
        )}
        {question_name != "" && (
          <input
            type="text"
            name="question_name"
            style={{ width: "100%" }}
            placeholder={question_name}
            value={question_name}
            onChange={(event) => {
              set_question_name(event.target.value);
            }}
          />
        )}
      </label>
      <label style={{ height: "80%" }}>
        <input
          type="text"
          name="question_text"
          value={question_text}
          style={{ width: "100%", height: "100%" }}
          onChange={(event) => {
            set_question_text(event.target.value);
          }}
        />
      </label>
    </form>
  );
};
