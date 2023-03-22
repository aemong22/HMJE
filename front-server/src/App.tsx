import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Intro from "./Components/Intro/Intro";
import Login from "./Components/Login/Login";
import MyPage from "./Components/MyPage/MyPage";
import Join from "./Components/Join/Join";
import Main from "./Components/Main/Main";
import Dictionary from "./Components/Dictionary/Dictionary";
import StudyPage from "./Components/Study/StudyPage";
import AdminUser from "./Components/Admin/AdminUser";
import AdminPage from "./Components/Admin/AdminPage";
import AdminMain from "./Components/Admin/AdminMain";
import AdminContext from "./Components/Admin/AdminContext";
import AdminBadge from "./Components/Admin/AdminBadge";
import ForgetId from "./Components/Login/ForgetId";
import ForgetPassword from "./Components/Login/ForgetPassword";
import WrongNote from "./Components/Study/WrongNote";
import Dogam from "./Components/Study/Dogam";
import Notice from "./Components/Notice/Notice";
import PastTestIntroModal from "./Components/Study/PastTestIntroModal";
import PastTest from "./Components/Study/PastTest";
import AdminExam from "./Components/Admin/AdminExam";
import Cat from "./Components/Threejs/Cat";

function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetid" element={<ForgetId />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dictionary" element={<Dictionary />} />

        <Route path="/wordStudy" element={<StudyPage />} />
        <Route path="/contextStudy" element={<StudyPage />} />
        <Route path="/wrongStudy" element={<StudyPage />} />
        <Route path="/note" element={<WrongNote/>} />
        <Route path="/dogam" element ={<Dogam/>} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/note" element={<WrongNote />} />
        <Route path="/dogam" element={<Dogam />} />
        <Route path="/pasttest" element={<PastTest />} />
        

        <Route path="/admin" element={<AdminPage />}>
          <Route path="" element={<AdminMain />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="badge" element={<AdminBadge />} />
          <Route path="context" element={<AdminContext />} />
          <Route path="exam" element={<AdminExam />} />
        </Route>

        <Route path="/cat" element={<Cat />} />

      </Routes>
    </>
  );
}

export default App;
