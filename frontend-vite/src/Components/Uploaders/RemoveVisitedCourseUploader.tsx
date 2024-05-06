import { API_URL } from "@/src/constants";
import { Visited_POST } from "@/src/props/Props";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

/**
 * Funkcia removeVisitedCourse slúži na vymazánie aktualne navštevovaného kurz z backendu.
 * @param {string} props.userID - ID užívateľa.
 * @param {string} props.courseID - ID kurzu.
 * @param {QueryClient} props.querryClient - querry klient.
 */
async function removeVisitedCourse(
  userID: string,
  courseID: string,
  queryClient: QueryClient
) {
  const visited: Visited_POST = {
    userID: userID,
    courseID: courseID,
  };
  axios
    .post(API_URL + "/visited/remove", visited, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      queryClient.invalidateQueries({
        queryKey: ["userCourses"],
      });
    });
}
export default removeVisitedCourse;
