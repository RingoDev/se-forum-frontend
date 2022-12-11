import React, { ChangeEventHandler, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserT } from "../types";
import axios from "axios";
import { UserContext } from "../util/util";

interface Props {
  setLoggedInUser: (user: UserT) => void;
}

const RegisterForm = ({ setLoggedInUser }: Props) => {
  const [username, setUsername] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (username !== undefined) {
      axios
        .post<UserT, any, any>("http://localhost:8080/user/add", {
          username: username,
          passwordHash: "random-hash",
        })
        .then((r) => {
          if (r.status === 200) {
            setLoggedInUser(r.data);
            console.log("registered as user ", r.data);
          } else {
            console.warn(r);
          }
        })
        .catch(console.error);
    }
  };

  const loggedInUser = useContext(UserContext);

  if (loggedInUser) {
    return <Navigate to={"/user/" + loggedInUser.id} />;
  }

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>Registrieren</h1>
      </div>
      <main className={"flex justify-center items-center h-screen"}>
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
            className={
              "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
            }
            type={"password"}
          />
          <label htmlFor={"password-check"} className={"text-black-700"}>
            Passwort wiederholen
          </label>
          <input
            className={
              "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
            }
            type={"password-check"}
          />
          <button
            onClick={handleSubmit}
            type={"submit"}
            className={
              "bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors mb-8"
            }
          >
            Registrieren
          </button>
          <p className={"mb-2"}>
            Bereits Mitglied im Forum?
            <br />
            <span className={"line text-blue-600"}>
              <Link to={"/login"}>Einloggen</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default RegisterForm;
