import React, { useEffect, useState } from "react";
import MobileBasicView from "../MobileView/MobileBasicView";
import fetchOkruhs from "../../Downloaders/OkruhsDownloader";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card as UICard } from "@/components/ui/card";
import fetchCourses from "../../Downloaders/CoursesDownloader";
interface Props {
  courseID: string;
  onSelected: (selected: string) => void;
}
const StudyScreen = ({ onSelected }: Props) => {
  let navigate = useNavigate();
  const [courseID, setCourseID] = useState("1");
  const {
    status,
    error,
    data: okruhs,
  } = useQuery({
    queryKey: ["okruhy", courseID],
    queryFn: () => fetchOkruhs(courseID),
  });
  const { status: status_courses, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });
  if (status === "pending") {
    return (
      <MobileBasicView>
        <div className="card-body">
          <h1>Loading...</h1>
        </div>
      </MobileBasicView>
    );
  } else
    return (
      <UICard
        style={{
          minWidth: "500px",
          maxWidth: "700px",
          height: "100vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <select
            style={{ width: "50%" }}
            className="center"
            id="courses"
            value={courseID}
            onChange={(selected) => setCourseID(selected.target.value)}
          >
            {courses!.map((course: Course) => (
              <option value={course.id}>{course.name}</option>
            ))}
          </select>
          <h2 style={{ display: "block", textAlign: "center" }}>Okruhy</h2>
          {okruhs!.map((okruh: Okruh, index) => (
            <>
              {okruh.available && (
                <Link
                  onClick={() => onSelected(okruh.id)}
                  to="/studyInfo"
                  className="btn btn-primary"
                  style={{
                    width: "80%",
                    margin: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {okruh.name}
                </Link>
              )}
              {!okruh.available && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled
                  style={{
                    width: "80%",
                    margin: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {okruh.name}
                </button>
              )}
            </>
          ))}
        </div>
      </UICard>
    );
};

export default StudyScreen;
