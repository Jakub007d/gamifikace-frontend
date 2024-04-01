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
import fetchQuestions from "./Components/Downloaders/QuestionsDownloader";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import List from "./Components/List";
import QuestionDetail from "./Components/QuestionDetail";
import { Navbar } from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
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
function App() {
  const [selectedOkruh, setOkruh] = useState("1");
  const [selectedCourse, setCourse] = useState("1");
  const [lectionID, setLectionID] = useState("");
  const { status, data: questions } = useQuery({
    queryKey: [lectionID, "questions"],
    enabled: lectionID != "",
    queryFn: () => fetchQuestions(lectionID),
  });
  const { status: challange_status, data: challange_questions } = useQuery({
    queryKey: [selectedCourse, "challange_questions"],
    queryFn: () => fetchChallange(selectedCourse),
  });
  return (
    <div className="App d-flex flex-column">
      <Navbar />
      <h1>Hello</h1>
      <Routes>
        <Route
          path="/testOkruhs"
          element={
            <StudyScreen
              onSelected={(selected) => {
                setCourse(selected), setLectionID(selected);
              }}
              courseID={selectedCourse}
            />
          }
        />
        <Route
          path="/FlashCards"
          element={<FlashCard question={questions!} okruhID={lectionID} />}
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
