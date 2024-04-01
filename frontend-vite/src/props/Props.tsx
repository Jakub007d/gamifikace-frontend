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
  is_text_question: Boolean;
}
interface Answer {
  id: string;
  text: string;
  answer_type: boolean;
  question: string;
}
interface Okruh {
  id: string;
  name: string;
  available: boolean;
  course: string;
}

interface Comment {
  id: string;
  text: string;
  created_at: Date;
  created_by: string;
  likes: number;
  question: string;
}
interface User {
  username: string;
  email: string;
  id: string;
}
interface Course {
  id: string;
  name: string;
}
interface Score {
  id: string;
  points: number;
  user_id: string;
  username: string;
  coursename: string;
}
interface Score_POST {
  user_id: string;
  courseID: string;
  point: number;
}
interface Comment_POST {
  user_id: string;
  question_id: string;
  text: string;
}
