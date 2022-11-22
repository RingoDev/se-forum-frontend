import React from "react";
import { Link } from "react-router-dom";
import { PostT } from "../types";

interface Props {
  posts: PostT[];
}

export default function Posts({ posts }: Props) {
  return (
    <div className={"max-w-2xl p-12 mx-auto"}>
      {posts.map((p) => (
        <div key={p.id} className={"py-6"}>
          <Link to={"/" + p.id}>
              <div className={"flex flex-row justify-between items-end mb-4"}>
            <div>
              <span className={"text-gray-600"}>{p.id} </span>
              <span className={"text-xl"}>{p.title}</span>
            </div>
            <p>Erstellungsdatum: {p.creationTime}</p>
              </div>
            <p>{p.content.substring(0, 200)}...</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
