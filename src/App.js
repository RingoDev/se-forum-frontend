import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";
import Posts from "./components/Posts";
import DetailedPost from "./components/DetailedPost";
import posts from "./data/posts.json"


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


export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Posts posts={posts}/>}/>
                    <Route path="/:id" element={<DetailedPost posts={posts}/>}/>
                </Routes>
            </div>
        </Router>
    );
}
