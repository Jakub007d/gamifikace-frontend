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
export const AnswerField = ({ onSubmit, disabled, colour }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem style={{ height: "100%" }}>
              <FormControl>
                <Input
                  placeholder="Odpoveď"
                  {...field}
                  disabled={disabled}
                  style={{ color: colour }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    </Form>
  );
};
