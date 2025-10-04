import React,{useState} from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./Components/Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Modal/Login";

const App = () => {

  return (
    <div>
      <Navbar />       
    </div>
  );
};

export default App
