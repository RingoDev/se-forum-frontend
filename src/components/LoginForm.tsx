import React, { ChangeEventHandler, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserT } from "../types";
import axios from "axios";
import { UserContext } from "../util/util";

interface Props {
  setLoggedInUser: (user: UserT) => void;
}

const LoginForm = ({ setLoggedInUser }: Props) => {
  const [username, setUsername] = useState<String>();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (username !== undefined) {
      axios
        .get<UserT>(
          "http://localhost:8080/user/byUsername?username=" + username
        )
        .then((r) => {
          if (r.status === 200) {
            setLoggedInUser(r.data);
            console.log("logged in as user ", r.data);
          } else {
            console.log(r);
          }
        })
        .catch(console.log);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const loggedInUser = useContext(UserContext);

  if (loggedInUser) {
    return <Navigate to={"/user/" + loggedInUser.id} />;
  }

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>Einloggen</h1>
      </div>
      <main className={"flex justify-center items-center h-screen"}>
        <form onSubmit={handleSubmit}>
          <div className={"w-96 p-6 items-center justify-center h-screen"}>
            <label htmlFor={"username"} className={"text-black-700"}>
              Benutzername
            </label>
            <input
              onChange={handleChange}
              className={
                "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
              }
              type={"username"}
            />
            <label htmlFor={"password"} className={"text-black-700"}>
              Passwort
            </label>
            <input
              disabled={true}
              className={
                "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
              }
              type={"password"}
            />
            <input id={"remember"} className={"mb-6"} type={"checkbox"} />
            <label htmlFor={"remember"} className={"text-gray-700"}>
              Login merken
            </label>
            <button
              type={"submit"}
              className={
                "bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors mb-8"
              }
            >
              Einloggen
            </button>
            <p className={"mb-2"}>
              Neu im Forum?
              <br />
              <span className={"line text-blue-600"}>
                <Link to={"/register"}>Registrieren</Link>
              </span>
            </p>
          </div>
        </form>
      </main>
    </>
  );
};

export default LoginForm;
