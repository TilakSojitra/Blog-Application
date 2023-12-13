import React from "react";
import Login from "./Components/login";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
