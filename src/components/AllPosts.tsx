import React, { useEffect, useState } from "react";
import { PostT } from "../types";
import axios from "axios";
import Posts from "./Posts";

export default function AllPosts() {
  const [posts, setPosts] = useState<PostT[]>([]);

  useEffect(() => {
    axios
      .get<PostT[]>("http://localhost:8080/post/all")
      .then((r) => {
        if (r.status === 200) {
          setPosts(r.data);
        } else {
          console.log(r);
        }
      })
      .catch(console.log);
  }, []);

  return (
    <div className={"max-w-2xl p-12 mx-auto"}>
      {posts.length === 0 ? (
        <div>Keine Posts vorhanden</div>
      ) : (
        <Posts posts={posts} />
      )}
    </div>
  );
}
