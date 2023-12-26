import React, { useState } from "react";
// import Login from "./Components/login";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import DataProvider from "./context/DataProvider";
import Login from "./Components/account/login";
import Home from "./Components/Home/home";
import Header from "./Components/header/header";
import CreatePost from "./Components/create/createpost";

const PrivateRoute = ({ isauthenticated, ...props }) => {
  return isauthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  const [isauthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login isUserAuthenticated={isUserAuthenticated} />}
          />
          <Route
            path="/"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route
            path="/create"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/create" element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
