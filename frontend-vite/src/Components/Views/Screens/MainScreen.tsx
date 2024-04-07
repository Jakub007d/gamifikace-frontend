import React from "react";
import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import fetchCourses from "../../Downloaders/CoursesDownloader";
import { useQuery } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import StudyScreen from "./StudyScreen";
import fetchScore from "../../Downloaders/ScoreDownloader";
import user_icon from "../icons/user-icon-svgrepo-com.svg";
import { Course, Score } from "@/src/props/Props";
import back_icon from "./icon/back.svg";
import { LogOut } from "lucide-react";
import Logout from "../../LoginComponents/logout";
import { Leaderboard_mini } from "../../Leaderboard/Leaderboard_mini";
interface Props {
  courseID: string;
  set_course_id: (courseID: string) => void;
}
export const MainScreen = ({ courseID, set_course_id }: Props) => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const { status, data: scores } = useQuery({
    queryKey: ["score", courseID],
    queryFn: () => fetchScore(courseID),
  });
  const { status: status_courses, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });
  return (
    <UICard className="ui_card">
      {status === "pending" && <div>Loading...</div>}
      {status === "success" && (
        <>
          <CardHeader
            className="cardHeader"
            style={{
              minHeight: "200px",
              maxHeight: "60%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              flexDirection: "column",
              alignContent: "space-around",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Rebríček</h5>
            <Leaderboard_mini data={scores} />
          </CardHeader>
          <CardContent style={{ height: "40%" }}>
            <div
              className=""
              style={{
                marginTop: "10px",
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-evenly",
                height: "70%",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => navigate("/testOkruhs")}
              >
                Štúdium
              </button>
              {localStorage.getItem("access_token") != undefined && (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/Challange")}
                >
                  Výzva
                </button>
              )}
            </div>
          </CardContent>
        </>
      )}
    </UICard>
  );
};
