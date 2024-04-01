export interface Question {
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
export interface Answer {
  id: string;
  text: string;
  answer_type: boolean;
  question: string;
}
export interface Okruh {
  id: string;
  name: string;
  available: boolean;
  course: string;
}

export interface Comment {
  id: string;
  text: string;
  created_at: Date;
  created_by: string;
  likes: number;
  question: string;
}
export interface User {
  username: string;
  email: string;
  id: string;
}
export interface Course {
  id: string;
  name: string;
}
export interface Score {
  id: string;
  points: number;
  user_id: string;
  username: string;
  coursename: string;
}
export interface Score_POST {
  user_id: string;
  courseID: string;
  point: number;
}
export interface Comment_POST {
  user_id: string;
  question_id: string;
  text: string;
}
