import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { PostT } from "../types";
import { UserContext } from "../util/util";
import axios from "axios";

const PostCreation = () => {
  //TODO make it typescripty
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [submittedPost, setSubmittedPost] = useState<PostT>();

  const user = useContext(UserContext);

  const handleSubmit = () => {
    const post = { title, content: text, userId: user?.id };

    axios
      .post<PostT, any, Partial<PostT>>("http://localhost:8080/post/add", post)
      .then((r) => {
        if (r.status === 200) {
          console.log("Post erstellt!");
          setSubmittedPost(r.data);
        } else {
          console.warn(r);
        }
      })
      .catch(console.error);
  };

  if (submittedPost) {
    return <Navigate to={"/post/" + submittedPost.id} />;
  }

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>Post erstellen</h1>
      </div>
      <main className={"flex justify-center items-center h-screen"}>
        <div className={"w-96 p-6 items-center justify-center h-screen"}>
          <label className={"text-black-700"}>Titel</label>
          <input
            className={
              "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
            }
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={"text-black-700"}>Text</label>
          <textarea
            className={
              "w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
            }
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            type={"submit"}
            className={
              "bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors mb-8"
            }
          >
            Post erstellen
          </button>
        </div>
      </main>
    </>
  );
};

export default PostCreation;
