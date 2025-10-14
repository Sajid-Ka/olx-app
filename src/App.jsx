import React from "react";
import Home from "./Components/Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Components/Details/Details";
import Favorites from "./Components/Favorite/Favorite";
import MyProducts from "./Components/MyAds/MyProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;