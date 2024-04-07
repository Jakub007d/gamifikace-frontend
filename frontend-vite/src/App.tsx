//React-querry, tailwind
interface Question {
  id: string;
  name: string;
  text: string;
  approved: boolean;
  visible: boolean;
  created_by: string;
  likes: Number;
  created_at: Date;
  okruh: string;
}
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
import reactLogo from "./assets/react.svg";
import "./App.css";
import List from "./Components/List";
import QuestionDetail from "./Components/QuestionDetail";
import { Navbar } from "./Components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Card from "./Components/Card";
import FlashCard from "./Components/FlashCard";
import StudyScreen from "./Components/Views/Screens/StudyScreen";
import { StudyInfo } from "./Components/Views/Screens/StudyInfo";
import QuizScreen from "./Components/Views/Screens/QuizScreen";
import { useQuery } from "@tanstack/react-query";
import { LoginScreen } from "./Components/Views/Screens/LoginScreen";
import { CommentScreen } from "./Components/Views/Screens/CommentScreen";
import { MainScreen } from "./Components/Views/Screens/MainScreen";
import { AddQuestionScreen } from "./Components/Views/Screens/AddQuestionScreen";
import fetchChallange from "./Components/Downloaders/ChallangeDownloader";
import { boolean } from "zod";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
import Logout from "./Components/LoginComponents/logout";
import fetchCourses from "./Components/Downloaders/CoursesDownloader";
import { Course } from "./props/Props";
import fetchUserName from "./Components/Downloaders/UserNameByIDDownloader";
import fetchUserID from "./Components/Downloaders/UserIDDownloader";
import fetchUser from "./Components/Downloaders/UserDownloader";
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
      case "/Challange/Detail":
        return false;
      case "/Quiz/Detail":
        return false;
    }
    return true;
  }
  let navigate = useNavigate();
  const [dest_address, set_address] = useState("/");
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
  useEffect(() => {
    navigate("/Courses");
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gamifikace
            </Typography>
            {course_status === "success" && (
              <select
                style={{ width: "50%" }}
                className="center"
                id="courses"
                value={selectedCourse}
                onChange={(selected) => setCourse(selected.target.value)}
                disabled={!disabled_back()}
              >
                {courses!.map((course: Course) => (
                  <option value={course.id}>{course.name}</option>
                ))}
              </select>
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
              setCourseID={(selected: string) => setCourse(selected)}
            />
          }
        />
        <Route
          path="/FlashCards"
          element={<FlashCard question={questions!} okruhID={selectedOkruh} />}
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
          element={
            <MainScreen
              courseID={selectedCourse}
              set_course_id={(courseID: string) => {
                setCourse(courseID);
                setLectionID(courseID);
              }}
            />
          }
        />
        <Route
          path="/AddQuestion/*"
          element={<AddQuestionScreen lectionID={selectedOkruh} />}
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

/*
OAUTH Google cloud platform
jakubdrobena@MacBook-Air-uzivatela-Jakub frontend-vite % npm run dev
python manage.py runserver
/Users/jakubdrobena/Desktop/test/Gamifikace/gamifikace
*/

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

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
