import React from "react";
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
const formSchema = z.object({
  answer: z.string().min(1, {
    message: "Odpoveď musí mať aspon 1 znak!",
  }),
});
interface Props {
  onSubmit: (answered: FieldValues) => void;
  disabled: boolean;
  colour: string;
}
/**
 * AnswerField pole pre zadavanie odpovede.
 * @param {Props} props
 * @param {Function} props.onSubmit - Callback funkcia zavolaná pri submite.
 * @param {string} props.disabled - Určuje či je povolené zadávanie textu.
 * @param {Boolean} props.colour - Farba textfieldu.
 * @returns {JSX.Element} - Vracia funkčnú komponentu AnswerField.
 */
export const AnswerField = ({ onSubmit, disabled, colour }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem
              style={{ height: "100%", width: "70%", marginTop: "10px" }}
            >
              <FormControl>
                <Input
                  placeholder="Odpoveď"
                  {...field}
                  disabled={disabled}
                  style={{
                    color: colour,
                    width: "100%",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        >
          Zadať
        </Button>
      </form>
    </Form>
  );
};
