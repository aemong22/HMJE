import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Intro from './Components/Intro/Intro';

function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <Routes>
        <Route path='/' element={<Intro/>}/>
      </Routes>
    </>
  );
}

export default App;
