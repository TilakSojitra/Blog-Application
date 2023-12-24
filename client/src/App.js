import React from "react";
// import Login from "./Components/login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DataProvider from "./context/DataProvider";
import Login from "./Components/account/login";
import Home from "./Components/Home/home";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
