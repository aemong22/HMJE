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
import AdminUser from "./Components/Admin/AdminUser";
import AdminPage from "./Components/Admin/AdminPage";
import AdminMain from "./Components/Admin/AdminMain";
import AdminExam from "./Components/Admin/AdminExam";
import AdminContext from "./Components/Admin/AdminContext";
import AdminBadge from "./Components/Admin/AdminBadge";


function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/admin" element={<AdminPage/>}>
          <Route path="" element={<AdminMain/>}/>
          <Route path="user" element={<AdminUser/>}/>
          <Route path="badge" element={<AdminBadge/>}/>
          <Route path="context" element={<AdminContext/>}/>
          <Route path="exam" element={<AdminExam/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
