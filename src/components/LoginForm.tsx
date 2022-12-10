import React from "react";
import {Link} from "react-router-dom";
import {PostT} from "../types";
import {useRef, useState, useEffect} from "react";
import {ReactSession} from "react-client-session";

export default function LoginForm() {
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    ReactSession.set("username", "Bob");
    //TODO: axios submit to backend
  }

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>Einloggen</h1>
      </div>
      <main className={"flex justify-center items-center h-screen"}>
        <form onSubmit={handleSubmit}>
          <div className={"w-96 p-6 items-center justify-center h-screen"}>
            <label htmlFor={"username"} className={"text-black-700"}>Benutzername</label>
            <input
              className={"w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"}
              type={"username"}
            />
            <label htmlFor={"password"} className={"text-black-700"}>Passwort</label>
            <input
              className={"w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"}
              type={"password"}
            />
            <input
              id={"remember"}
              className={"mb-6"}
              type={"checkbox"}
            />
            <label htmlFor={"remember"} className={"text-gray-700"}>Login merken</label>
            <button
              type={"submit"}
              className={
                "bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors mb-8"}>
              Einloggen
            </button>
            <p className={"mb-2"}>
              Neu im Forum?<br/>
              <span className={"line text-blue-600"}>
                  <Link to={"/register"}>Registrieren</Link>
              </span>
            </p>
          </div>
        </form>

      </main>
    </>
  );
}
