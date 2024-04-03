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
          <CardHeader className="cardHeader" style={{ minHeight: "150px" }}>
            <div
              style={{
                height: "50px",
                backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <select
                style={{ width: "50%" }}
                className="center"
                id="courses"
                value={courseID}
                onChange={(selected) => set_course_id(selected.target.value)}
              >
                {courses!.map((course: Course) => (
                  <option value={course.id}>{course.name}</option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!!!localStorage.getItem("access_token"))
                    navigate("/login");
                  else Logout();
                }}
              >
                {!!!localStorage.getItem("access_token") && <p>Login</p>}
                {!!localStorage.getItem("access_token") && <p>Logout</p>}
              </button>
            </div>

            <h5>Rebríček</h5>
            <div
              className="d-flex border border-secondary rounded card-body justify-content-center"
              style={{ height: "90%", margin: "20px" }}
            >
              <div
                className="score"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-evenly",
                  height: "100%",
                  width: "100%",
                  overflow: "scroll",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {scores.map((score: Score) => (
                  <button
                    className="btn btn-primary"
                    style={{
                      margin: "2px",
                      width: "80%",
                      marginRight: "auto",
                      marginLeft: "auto",
                      maxHeight: "80px",
                    }}
                  >
                    <div
                      style={{
                        maxHeight: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={user_icon}
                        style={{ maxHeight: "80%", maxWidth: "10%" }}
                        alt="User Icon "
                      />
                      <p style={{ display: "block", fontSize: "20px" }}>
                        {score.username}: {score.points}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent style={{ height: "100%" }}>
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
