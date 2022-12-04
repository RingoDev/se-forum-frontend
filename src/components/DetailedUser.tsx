import React from "react";
import { Link, useParams } from "react-router-dom";
import { PostT } from "../types";
import Posts from "./Posts";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

interface Props {
    posts: PostT[];
}

export default function DetailedUser({ posts }: Props) {
    const userId = Number(useParams().id);
    const userPosts = posts.filter((p) => p.user.id === userId);
    /*
    TODO: Fehleranfällig, wenn Nutzer keinen einzigen Post erstellt hat. API zur Abfrage eines Nutzers fehlt jedoch.
    Evtl. später ergänzen.
     */
    const userName = userPosts[0].user.username;

    return (
        <>
            <div className={"max-w-2xl p-12 mx-auto"}>
                <h1 className={"text-2xl text-center"}>Alle Posts von {userName}</h1>
            </div >
            <Posts posts={userPosts} />
            {/*TODO: Evtl. Kommentare anzeigen lassen? API dazu fehlt dazu jedoch auch, außer Iteration durch alle Posts.*/}
            <div className={"max-w-2xl p-12 mx-auto"}>
                <h1 className={"text-2xl text-center"}>Alle Kommentare von {userName}</h1>
            </div >
        </>
    )
}
