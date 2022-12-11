import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostT, UserT } from "../types";
import Posts from "./Posts";
import axios from "axios";

export default function DetailedUser() {
  const userId = useParams().id;
  const [user, setUser] = useState<UserT>();
  const [posts, setPosts] = useState<PostT[]>([]);

  useEffect(() => {
    // retrieve user info
    axios
      .get<UserT>("http://localhost:8080/user/" + userId)
      .then((userResponse) => {
        if (userResponse.status === 200) {
          setUser(userResponse.data);
          axios
            .get<PostT[]>("http://localhost:8080/user/" + userId + "/posts")
            .then((postResponse) => {
              if (postResponse.status === 200) {
                setPosts(postResponse.data);
              } else {
                console.log(postResponse);
              }
            })
            .catch(console.log);
        } else {
          console.warn(userResponse);
        }
      })
      .catch(console.error);
  }, [userId]);

  return (
    <>
      <div className={"max-w-2xl p-12 mx-auto"}>
        <h1 className={"text-2xl text-center"}>
          Alle Posts von {user?.username}
        </h1>
      </div>
      {posts.length === 0 ? (
        <div className={"text-center"}>
          {user?.username} hat noch nichts gepostet
        </div>
      ) : (
        <Posts posts={posts} />
      )}

      {/*TODO: Evtl. Kommentare anzeigen lassen? API dazu fehlt dazu jedoch auch, außer Iteration durch alle Posts.*/}
      {/*<div className={"max-w-2xl p-12 mx-auto"}>*/}
      {/*    <h1 className={"text-2xl text-center"}>*/}
      {/*        Alle Kommentare von {user?.username}*/}
      {/*    </h1>*/}
      {/*</div>*/}
    </>
  );
}
