import React from "react";
import axios from "axios";
import { date } from "zod";
import fetchUser from "../Downloaders/UserDownloader";
import fetchUserID from "../Downloaders/UserIDDownloader";
import { API_URL } from "@/src/constants";
import { Score_POST } from "@/src/props/Props";
/**
 * Funkcia ScoreUploader nahráva aktualne získané skóre užívateľa na backend.
 * @param {string} props.courseID - ID kurzu.
 * @param {string} props.points - získané skóre.
 */
async function ScoreUploader(courseID: string, points: number) {
  fetchUserID(localStorage.getItem("access_token")!).then(
    async (user_id: string) => {
      const question: Score_POST = {
        user_id: user_id,
        courseID: courseID,
        point: points,
      }; // Create the POST requuest
      const { data } = await axios.post(API_URL + "/score/entry", question, {
        headers: { "Content-Type": "application/json" },
      });
    }
  );
}

export default ScoreUploader;
