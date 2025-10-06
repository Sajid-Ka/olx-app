import React,{useState} from "react";
import Home from "./Components/Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Components/Details/Details";


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App
