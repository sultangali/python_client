import React from "react";
import { Routes, Route } from "react-router-dom"
import Header from "./components/header.jsx"
import ShortHeader from "./components/shortHeader.jsx";

import { Registration, Main, Login, Profile, ProfileEmployee, ForStudent, ForEmployee, RegistrationEmployee, LoginEmployee} from '../src/pages/index.js'
import EditProfile from "./components/Student/editProfile.jsx";
import EditProfileEmployee from "./components/Employee/editProfile.jsx";
import Classrooms from "./components/Classroom/Classrooms.jsx";
import { useDispatch } from "react-redux";
import * as fetches from './redux/slices/user.js'
import CreateClassroom from "./components/Classroom/CreateClassroom.jsx";
import Requests from "./components/Employee/Moderator/Requests.jsx";
import ClassroomFull from './components/Classroom/ClassroomFull.jsx'
import InsertStudents from "./components/Classroom/InsertStudents.jsx";
import Questions from "./components/Student/Questions/Questions.jsx";
import CreateChapter from "./components/Employee/Lessons/CreateChapter.jsx";
import CreateLesson from "./components/Employee/Lessons/CreateLesson.jsx";
import Lessons from "./components/Employee/Lessons/Lessons.jsx";
import Chapters from "./components/Employee/Lessons/Chapters.jsx";
import Class from "./components/Employee/Lessons/Class.jsx";
import LessonFull from "./components/Employee/Lessons/LessonFull.jsx";
import Quiz from "./components/Employee/Quiz/Quiz.jsx";
import Exam from "./components/Employee/Quiz/Exam.jsx";
import Subjects from "./components/Student/Lessons/Subjects.jsx";
import ChaptersStud from "./components/Student/Lessons/Chapters.jsx";
import LessonsStud from './components/Student/Lessons/Lessons.jsx'
import LessonFullStud from './components/Student/Lessons/LessonFull.jsx'
import PassQuiz from './components/Student/Quiz/Quiz.jsx'
import PassExam from './components/Student/Exam/Exam.jsx'
import StudentDetail from './components/Employee/StudentDetail/StudentDetail.jsx'
import Contact from "./pages/Contact.jsx";
function App() {
  
  const dispatch = useDispatch()

  React.useEffect( ()  => {
    dispatch(fetches.fetchAuthMe())
  }, [dispatch])
  

  return ( 
  <>
    <Routes>
      <Route path="/" element={<><Header/><Main/></>  } />

        <Route path="/for-student" element={<><Header/><ForStudent/></> } />
        <Route path="/for-student/login" element={<><ShortHeader/><Login/></> } />
        <Route path="/for-student/registration" element={<><ShortHeader/><Registration/></> } />
        
        <Route path="/for-employee" element={<><Header/><ForEmployee/></> } />
        <Route path="/for-employee/registration" element={<><ShortHeader/><RegistrationEmployee/></> } />
        <Route path="/for-employee/login" element={<><ShortHeader/><LoginEmployee/></> } />

        <Route path="/student-profile" element={<><Header/><Profile/></> } />
        <Route path="/employee-profile" element={<><Header/><ProfileEmployee/></> } />
        <Route path="/edit-student-profile" element={<><Header/><EditProfile/></> } />
        <Route path="/edit-employee-profile" element={<><Header/><EditProfileEmployee/></> } />

        <Route path="/classrooms" element={<><Header/><Classrooms/></> } />
        <Route path="/create-classroom" element={<><Header/><CreateClassroom/></> } />

        <Route path="/student-requests" element={<><Header/><Requests/></> } />
        
        <Route path="/all-subjects" element={<><Header/><Subjects/></> } />

        <Route path="/quiz" element={<><Header/><Quiz/></> } />
        <Route path="/exam" element={<><Header/><Exam/></> } />
        

        <Route path="/classrooms/:id" element={<><Header/><ClassroomFull/></> } />
        <Route path="/classrooms/:id/insert-students" element={<><Header/><InsertStudents/></> } />

        <Route path="/student-questions" element={<><Header/><Questions/></> } />

        <Route path="/class/:id/create-chapter" element={<><Header/><CreateChapter/></> } />
        <Route path="/class/:i/chapter/:id/create-lesson" element={<><Header/><CreateLesson/></> } />

        <Route path="/class" element={<><Header/><Class/></> } />
        <Route path="/class/:id/all-chapters" element={<><Header/><Chapters/></> } />
        <Route path="/class/:class_id/chapter/:id/all-lessons" element={<><Header/><Lessons/></> } />
        <Route path="/class/:class_id/chapter/:chapter/lesson/:lesson" element={<><Header/><LessonFull/></> } />
   
        <Route path="/all-subjects/:id/all-chapters" element={<><Header/><ChaptersStud/></> } />
   
        <Route path="/all-subjects/:subject_id/all-chapters/:chapter_id/all-lessons" element={<><Header/><LessonsStud/></> } />
        <Route path="/all-subjects/:subject_id/all-chapters/:chapter_id/all-lessons/:lesson_id" element={<><Header/><LessonFullStud/></> } />
   
        <Route path="/pass-quiz" element={<><Header/><PassQuiz/></> } />
  
        <Route path="/pass-exam" element={<><Header/><PassExam/></> } />

        <Route path="/student-detail-for-teacher/:student_id" element={<><Header/><StudentDetail/></> } />
        <Route path="/contact" element={<><Header/><Contact/></> } />

    </Routes>
  </>)
}

export default App;
