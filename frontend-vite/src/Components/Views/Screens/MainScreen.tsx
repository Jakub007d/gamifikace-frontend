import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchScore from "../../Downloaders/ScoreDownloader";
import { Leaderboard_mini } from "../../Leaderboard/Leaderboard_mini";
import CircularProgress from "@mui/material/CircularProgress";
interface Props {
  /** ID kurzu */
  courseID: string;
  /** ID užívateľa pokiaľ je prihlásený*/
  userID: string | undefined;
}
/**
 * Main screen komponenta vykresluje hlavnú obrazovku aplikácie.
 * @param {Props} props
 * @param {string} props.courseID - ID kurzu.
 * @param {Function} props.set_course_id - Funkcia pre nastavenie ID kurzu využitá v hooku ktorý sa nachádza v App.tsx.
 * @param {string|undefined} props.userID - ID uživateľa. Definované pokiaľ je uživateľ prihlásený
 * @returns {JSX.Element} - Vracia funkčný komponent MainScreen.
 */
export const MainScreen = ({ courseID, userID }: Props) => {
  let navigate = useNavigate();
  const { status, data: scores } = useQuery({
    queryKey: ["score", courseID],
    queryFn: () => fetchScore(courseID),
  });
  return (
    <UICard className="ui_card">
      {status === "pending" && (
        <>
          <CardHeader
            className="cardHeader"
            style={{
              minHeight: "200px",
              maxHeight: "55%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              flexDirection: "column",
              alignContent: "space-around",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Rebríček</h5>
            <div
              style={{
                outline: "1px solid",
                borderRadius: "5px",
                backgroundColor: "#e3e1e1",
                marginLeft: "auto",
                marginRight: "auto",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </div>
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
                width: "80%",
                marginRight: "auto",
                marginLeft: "auto",
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
              {localStorage.getItem("access_token") != undefined && (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/Challange")}
                >
                  Pridať otázku
                </button>
              )}
            </div>
          </CardContent>
        </>
      )}
      {status === "success" && (
        <>
          <CardHeader
            className="cardHeader"
            style={{
              minHeight: "200px",
              maxHeight: "55%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              flexDirection: "column",
              alignContent: "space-around",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Rebríček</h5>
            <Leaderboard_mini data={scores} userID={userID} />
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
                width: "80%",
                marginRight: "auto",
                marginLeft: "auto",
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
                  className="btn btn-primary"
                  onClick={() => navigate("/Challange")}
                >
                  Výzva
                </button>
              )}
              {localStorage.getItem("access_token") != undefined && (
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/AddCourse")}
                >
                  Pridať navštevované predmety
                </button>
              )}
              {localStorage.getItem("access_token") != undefined && (
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/AddQuestion/AddScreen")}
                >
                  Pridať otázku
                </button>
              )}
            </div>
          </CardContent>
        </>
      )}
    </UICard>
  );
};
