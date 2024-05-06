import Home_Icon from "@mui/icons-material/House";
import LeaderBoard from "@mui/icons-material/Leaderboard";
import Back_Icon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import fetchQuestions from "./Components/Downloaders/QuestionsDownloader";
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import FlashCard from "./Components/Views/Screens/FlashCard";
import StudyScreen from "./Components/Views/Screens/StudyScreen";
import { StudyInfo } from "./Components/Views/Screens/StudyInfo";
import QuizScreen from "./Components/Views/Screens/QuizScreen";
import { useQuery } from "@tanstack/react-query";
import { LoginScreen } from "./Components/Views/Screens/LoginScreen";
import { MainScreen } from "./Components/Views/Screens/MainScreen";
import { AddQuestionScreen } from "./Components/Views/Screens/AddQuestionScreen";
import fetchChallange from "./Components/Downloaders/ChallangeDownloader";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
import Logout from "./Components/LoginComponents/logout";
import fetchCourses from "./Components/Downloaders/CoursesDownloader";
import { Course } from "./props/Props";
import fetchUserID from "./Components/Downloaders/UserIDDownloader";
import fetchUser from "./Components/Downloaders/UserDownloader";
import { Leaderboard_maxi } from "./Components/Leaderboard/LeaderboardMaxi";
import { AddFavoriteCourses } from "./Components/Views/Screens/AddFavoriteCourses";
import fetchCourseByID from "./Components/Downloaders/CoursesByUserID";
function App() {
  function disabled_back() {
    switch (window.location.pathname) {
      case "/Challange/QuizCard":
        return false;
      case "/Challange/Summary":
        return false;
      case "/Quiz/Summary":
        return false;
      case "/Quiz/QuizCard":
        return false;
    }
    return true;
  }
  let navigate = useNavigate();
  const [dest_address, set_address] = useState("/");
  const [alert_shown, setShown] = useState(false);
  const [selectedOkruh, setOkruh] = useState("1");
  const [selectedCourse, setCourse] = useState("1");
  const [lectionID, setLectionID] = useState("");
  const { status, data: questions } = useQuery({
    queryKey: [selectedOkruh, "questions"],
    enabled: selectedOkruh != "",
    queryFn: () => fetchQuestions(selectedOkruh),
  });
  const { status: challange_status, data: challange_questions } = useQuery({
    queryKey: [selectedCourse, "challange_questions"],
    queryFn: () => fetchChallange(selectedCourse),
  });
  const { status: course_status, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });
  const { status: user_status, data: user_name } = useQuery({
    queryKey: ["userName"],
    enabled: !!localStorage.getItem("access_token"),
    queryFn: () => fetchUser(localStorage.getItem("access_token")!),
  });
  const { status: userID_status, data: user_id } = useQuery({
    queryKey: ["userID"],
    enabled: !!localStorage.getItem("access_token"),
    queryFn: () => fetchUserID(localStorage.getItem("access_token")!),
  });
  const { status: user_course_status, data: user_courses } = useQuery({
    queryKey: ["userCourses"],
    enabled: !!user_id,
    queryFn: () => fetchCourseByID(user_id!),
  });
  useEffect(() => {
    navigate("/Courses");
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ marginRight: "5px" }}
            >
              Gamifikace
            </Typography>

            {!!user_id && user_course_status === "success" && (
              <FormControl fullWidth style={{ width: "50%" }}>
                <InputLabel
                  id="courses-label"
                  style={{ backgroundColor: "white" }}
                >
                  Predmety
                </InputLabel>
                <Select
                  labelId="courses-label"
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  className="center"
                  id="courses"
                  label="Predmety"
                  value={selectedCourse}
                  onChange={(selected) => setCourse(selected.target.value)}
                  disabled={!disabled_back()}
                >
                  {user_courses!.map((course: Course) => (
                    <MenuItem value={course.id}>{course.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {!!!user_id && course_status === "success" && (
              <FormControl fullWidth style={{ width: "50%" }}>
                <InputLabel
                  id="courses-label"
                  style={{ backgroundColor: "white" }}
                >
                  Predmety
                </InputLabel>
                <Select
                  labelId="courses-label"
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  className="center"
                  id="courses"
                  label="Predmety"
                  value={selectedCourse}
                  onChange={(selected) => setCourse(selected.target.value)}
                  disabled={!disabled_back()}
                >
                  {courses!.map((course: Course) => (
                    <MenuItem value={course.id}>{course.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {!!!user_id && course_status === "pending" && (
              <FormControl fullWidth style={{ width: "50%" }}>
                <InputLabel
                  id="courses-label"
                  style={{ backgroundColor: "white" }}
                >
                  Predmety
                </InputLabel>
                <Select
                  labelId="courses-label"
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  className="center"
                  id="courses"
                  label="Predmety"
                  value={selectedCourse}
                  onChange={(selected) => setCourse(selected.target.value)}
                  disabled={!disabled_back()}
                >
                  <LinearProgress />
                </Select>
              </FormControl>
            )}
            {!!user_id && user_course_status === "pending" && (
              <FormControl fullWidth style={{ width: "50%" }}>
                <InputLabel
                  id="courses-label"
                  style={{ backgroundColor: "white" }}
                >
                  Predmety
                </InputLabel>
                <Select
                  labelId="courses-label"
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  className="center"
                  id="courses"
                  label="Predmety"
                  value={selectedCourse}
                  onChange={(selected) => setCourse(selected.target.value)}
                  disabled={!disabled_back()}
                >
                  <LinearProgress />
                </Select>
              </FormControl>
            )}

            {localStorage.getItem("access_token") != null &&
              user_status === "success" && (
                <Avatar
                  {...stringAvatar(user_name)}
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                />
              )}
            {localStorage.getItem("access_token") == null && (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            {localStorage.getItem("access_token") != null && (
              <Button
                color="inherit"
                onClick={() => {
                  Logout();
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route
          path="/testOkruhs"
          element={
            <StudyScreen
              onSelected={(selected) => {
                setOkruh(selected);
              }}
              courseID={selectedCourse}
            />
          }
        />
        <Route
          path="/FlashCards"
          element={<FlashCard questions={questions!} okruhID={selectedOkruh} />}
        />
        <Route
          path="/studyInfo"
          element={<StudyInfo okruhID={selectedOkruh} />}
        />
        <Route
          path="/Quiz/*"
          element={
            <QuizScreen
              questions={questions!}
              is_challange={false}
              courseID={selectedCourse}
            />
          }
        />
        <Route path="/Login" element={<LoginScreen />} />
        <Route
          path="/Courses"
          element={<MainScreen courseID={selectedCourse} userID={user_id} />}
        />
        <Route
          path="/AddQuestion/*"
          element={
            <AddQuestionScreen
              lectionID={selectedOkruh}
              courseID={selectedCourse}
            />
          }
        />
        <Route
          path="/Challange/*"
          element={
            <QuizScreen
              questions={challange_questions!}
              is_challange={true}
              courseID={selectedCourse}
            />
          }
        />
        <Route
          path="/Leaderboard"
          element={<Leaderboard_maxi courseID={selectedCourse} />}
        />
        <Route
          path="/AddCourse"
          element={<AddFavoriteCourses userID={user_id!} />}
        />
      </Routes>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={dest_address}
          onChange={(event, newValue) => {
            if (newValue == "/back") navigate(-1);
            else navigate(newValue);
          }}
        >
          {disabled_back() && (
            <BottomNavigationAction
              label="Späť"
              icon={<Back_Icon />}
              value={"/back"}
            />
          )}
          <BottomNavigationAction
            label="Domov"
            icon={<Home_Icon />}
            value={"/Courses"}
          />
          <BottomNavigationAction
            label="Rebríček"
            icon={<LeaderBoard />}
            value={"/Leaderboard"}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
export default App;

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[1]}`,
  };
}
function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
