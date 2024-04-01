import React from "react";
import axios from "axios";
import { date } from "zod";
import fetchUser from "../Downloaders/UserDownloader";
import fetchUserID from "../Downloaders/UserIDDownloader";
import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "@/src/constants";
async function NewComment(
  questionID: string,
  text: string,
  queryClient: QueryClient
) {
  var today = new Date();
  fetchUserID(localStorage.getItem("access_token")!).then(
    async (user_id: string) => {
      const question: Comment_POST = {
        user_id: user_id,
        question_id: questionID,
        text: text,
      }; // Create the POST requuest
      axios
        .post(API_URL + "/comment/add", question, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.status == 200) {
            queryClient.invalidateQueries({
              queryKey: ["coments", questionID],
            });
          }
        });
    }
  );
}

export default NewComment;
