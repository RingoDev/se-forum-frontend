import React from "react";
import { Link } from "react-router-dom";
import { PostT } from "../types";

interface Props {
  posts: PostT[];
}

export default function Posts({ posts }: Props) {
  return (
    <div className={"max-w-4xl p-8 mx-auto"}>
      {posts.map((p) => (
        <div key={p.id} className={"py-6"}>
          <Link to={"/post/" + p.id}>
            <div className={"mb-6"}>
              {/*<span className={"text-gray-600"}>{p.id} </span>*/}
              <h2 className={"text-xl md:text-2xl text-center mb-6"}>
                {p.title}
              </h2>
              <p className={"text-lg md:text-xl"}>
                {p.content.length > 200
                  ? p.content.substring(0, 200) + "..."
                  : p.content}
              </p>
            </div>
            <div
              className={"flex justify-between w-full  italic text-slate-600"}
            >
              <p>{p.user.username}</p>
              <p className={"italic"}>{p.creationTime}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
