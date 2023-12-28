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
import DetailView from "./Components/details/Details";
import Update from "./Components/create/update";
import About from "./Components/about/about";
import Contact from "./Components/contact/contact";

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

          <Route
            path="/details/:id"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/details/:id" element={<DetailView />} />
          </Route>

          <Route
            path="/update/:id"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/update/:id" element={<Update />} />
          </Route>

          <Route
            path="/about"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/about" element={<About />} />
          </Route>
          
          <Route
            path="/contact"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route exact path="/contact" element={<Contact />} />
          </Route>

          
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
