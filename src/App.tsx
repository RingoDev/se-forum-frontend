import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import DetailedPost from "./components/DetailedPost";
import { UserT } from "./types";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import DetailedUser from "./components/DetailedUser";
import PostCreation from "./components/PostCreation";
import { UserContext } from "./util/util";
import AllPosts from "./components/AllPosts";

function getUserFromSessionStorage(): UserT | null {
  const userString = sessionStorage.getItem("user");
  if (userString === null) return null;
  else return JSON.parse(userString) as UserT;
}

//TODO: fetch all Posts from backend

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserT | null>(
    getUserFromSessionStorage()
  );

  const logUserIn = (user: UserT) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setLoggedInUser(getUserFromSessionStorage());
  };

  const logUserOut = () => {
    sessionStorage.removeItem("user");
    setLoggedInUser(getUserFromSessionStorage());
  };

  console.log("logged in as: ", loggedInUser);

  return (
    <UserContext.Provider value={loggedInUser}>
      <Router>
        <div>
          <nav className={"flex flex-row justify-center items-center h-20"}>
            <ul className={"flex flex-row justify-center items-center"}>
              <li className={"px-6"}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create-post">Post erstellen</Link>
              </li>

              <li className={"px-6"}>
                {loggedInUser === null ? null : (
                  <Link to={"/user/" + loggedInUser.id}>Profil</Link>
                )}
              </li>

              <li className={"px-6"}>
                {loggedInUser === null ? (
                  <Link to="/login">Einloggen</Link>
                ) : (
                  <button onClick={() => logUserOut()}>Logout</button>
                )}
              </li>
              <li className={"px-6"}>
                {loggedInUser === null ? (
                  <Link to="/register">Registrieren</Link>
                ) : null}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/post/:id" element={<DetailedPost />} />
            <Route path="/user/:id" element={<DetailedUser />} />
            <Route
              path="/login"
              element={<LoginForm setLoggedInUser={logUserIn} />}
            />
            <Route
              path="/register"
              element={<RegisterForm setLoggedInUser={logUserIn} />}
            />
            <Route path="/create-post" element={<PostCreation />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
