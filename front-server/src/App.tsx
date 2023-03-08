import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Intro from "./Components/Intro/Intro";
import Login from "./Components/Login/Login";
import MyPage from './Components/MyPage/MyPage';
import Join from './Components/Join/Join';
import Main from "./Components/Main/Main";

function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/join' element={<Join/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </>
  );
}

export default App;
