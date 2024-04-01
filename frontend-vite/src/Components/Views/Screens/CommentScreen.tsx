import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import fetchQuestions from "../../Downloaders/QuestionsDownloader";
import fetchComments from "../../Downloaders/CommentDownloader";
import { ComentView } from "../../Coments/ComentView";
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NewComment from "../../Uploaders/CommentUploader";
interface Props {
  questionID: string;
  onSubmit: (answered: FieldValues) => void;
}
const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Komentár musí ma1 znak",
  }),
});

export const CommentScreen = ({ questionID, onSubmit }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  const { status, data: comments } = useQuery({
    queryKey: ["coments", questionID],
    queryFn: () => fetchComments(questionID),
  });
  if (status === "success")
    return (
      <>
        <ul
          className="list-group"
          id="noScroll"
          style={{ maxHeight: "70%", overflow: "scroll" }}
        >
          {comments!.map((comment: Comment, index) => (
            <li className="list-group-item" key={comment.id}>
              <ComentView
                userID={comment.created_by}
                commentID={comment.id}
              ></ComentView>
              {comment.text}
            </li>
          ))}
        </ul>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((fieldValue: FieldValues) => {
              NewComment(questionID, fieldValue.comment, queryClient);
              form.resetField("comment");
            })}
            className="space-y-8"
            style={{ display: "flex", maxHeight: "40px" }}
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem style={{ height: "100%" }}>
                  <FormControl>
                    <Input
                      placeholder="Odpoveď"
                      {...field}
                      disabled={!!!localStorage.getItem("access_token")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={!!!localStorage.getItem("access_token")}
            >
              Submit
            </Button>
          </form>
        </Form>
      </>
    );
  else return <h1>Loading...</h1>;
};
