import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import pages/components
import NavBar from "./NavBar/NavBar";
import Home from "./Home/Home";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer/Footer";
import BlogPage from "./Blog/Blog";
import Category from "./Category/Category";
import Publish from "./Publish/Publish";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog/:url" Component={BlogPage} />
        <Route path="/publish" Component={Publish} />
        <Route path="/:btn" Component={Category} />
        <Route path="*" Component={ErrorPage} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
