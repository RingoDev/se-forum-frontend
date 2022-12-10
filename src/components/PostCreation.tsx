import React from "react";
import {Link} from "react-router-dom";
import {PostT} from "../types";
import {useRef, useState, useEffect} from "react";
import {ReactSession} from "react-client-session";
import {getCurrentDateTime} from "../util/util";

const PostCreation = () => {

  //TODO make it typescripty
  const [title, setTitle] = useState<any | null>("");
  const [text, setText] = useState<any | null>("");
  const [author, setAuthor] = useState<any | null>(1);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const creationTime = getCurrentDateTime(); //TODO check with backend
    const content = text;
    const user = author; //TODO check with backend
    const post = { creationTime, title, content, user};

    fetch("http://localhost:8080/post/add", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(post)
    }).then(() => {
      console.log("Post erstellt!")
    })
  }

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>Post erstellen</h1>
      </div>
      <main className={"flex justify-center items-center h-screen"}>
        <div className={"w-96 p-6 items-center justify-center h-screen"}>
        <form onSubmit={handleSubmit}>
          <label className={"text-black-700"}>Titel</label>
          <input
            className={"w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={"text-black-700"}>Text</label>
          <textarea
            className={"w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label className={"text-black-700 mr-2 mb-4"}>Autor</label>
          <select
            className={"text-black-700 mb-8"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value={1}>User 1</option>
            <option value={2}>User 2</option>
            <option value={3}>User 3</option>
          </select>
          <button
            type={"submit"}
            className={
              "bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors mb-8"}>
            Post erstellen
          </button>
        </form>
        </div>
      </main>
    </>
  )
}

export default PostCreation;