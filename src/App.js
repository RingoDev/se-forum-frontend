import React from "react"
import Post from "./components/Post"
import Comment from "./components/Comment"
import User from "./components/User"
import "./style.css"

export default function App() {

    const examplePost = {
        id: 1,
        creationTime: "11.11.2022",
        title: "Erster Post",
        content: "Erster Postinhalt",
        user: "User 1", //should be User object
        comments: ["Kommentar 1", "Kommentar 2", "Kommentar 3"], //should be list of Comment objects
        likes: 4, //should be Like object?
        dislikes: 1 //should be Dislike object?
    }

    const exampleComment = {
        id: 1,
        creationTime: "11.11.2022",
        title: "Erster Kommentar",
        content: "Erster Kommentarinhalt",
        user: "User 2", //should be list of User objects
        comments: ["Kommentar 1.1", "Kommentar 1.2", "Kommentar 1.3"], //should be list of Comment objects
        likes: 2, //should be Like object?
        dislikes: 0 //should be Dislike object?
    }

    const exampleUser = {
        id: 1,
        username: "XxPeterxX",
        passwordHash: "0a123b92f789055b946659e816834465"
    }

    return (
        <>
            <h1>Testausgaben</h1>
            <h2>Das ist ein Post:</h2>
            <Post
                {...examplePost}
            />
            <h2>Das ist ein Kommentar:</h2>
            <Comment
                {...exampleComment}
            />
            <h2>Das ist ein User:</h2>
            <User
                {...exampleUser}
            />
        </>
    )
}
