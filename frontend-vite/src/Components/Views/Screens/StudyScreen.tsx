import fetchOkruhs from "../../Downloaders/OkruhsDownloader";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card as UICard } from "@/components/ui/card";
import fetchCourses from "../../Downloaders/CoursesDownloader";
import { Okruh } from "@/src/props/Props";
import { CircularProgress } from "@mui/material";
interface Props {
  /** ID kurzu */
  courseID: string;
  /** Callback funkcia ktorá je vykonaná pri výbere okruhu */
  onSelected: (selected: string) => void;
}
/**
 * Komponent reprezentujúci obrazovku štúdia.
 * @param onSelected Funkcia volaná po výbere položky.
 * @param courseID ID kurzu.
 * @param setCourseID Funkcia na nastavenie ID kurzu.
 */
const StudyScreen = ({ onSelected, courseID }: Props) => {
  let navigate = useNavigate();
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
      <UICard className="ui_card">
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ display: "block", textAlign: "center" }}>Okruhy</h2>
          <button
            style={{
              margin: "2px",
              width: "80%",
              marginRight: "5px",
              marginLeft: "5px",
              maxHeight: "80px",
              height: "50px",
            }}
            className="btn btn-secondary"
            disabled
          >
            <CircularProgress />
          </button>
          <button
            style={{
              margin: "2px",
              width: "80%",
              marginRight: "5px",
              marginLeft: "5px",
              maxHeight: "80px",
              height: "50px",
            }}
            className="btn btn-secondary"
            disabled
          >
            <CircularProgress />
          </button>
          <button
            style={{
              margin: "2px",
              width: "80%",
              marginRight: "5px",
              marginLeft: "5px",
              maxHeight: "80px",
              height: "50px",
            }}
            className="btn btn-secondary"
            disabled
          >
            <CircularProgress />
          </button>
          <button
            style={{
              margin: "2px",
              width: "80%",
              marginRight: "5px",
              marginLeft: "5px",
              maxHeight: "80px",
              height: "50px",
            }}
            className="btn btn-secondary"
            disabled
          >
            <CircularProgress />
          </button>
        </div>
      </UICard>
    );
  } else
    return (
      <UICard className="ui_card">
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
