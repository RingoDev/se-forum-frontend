import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import DetailedPost from "./components/DetailedPost";
import { CommentT, PostT, UserT } from "./types";

const exampleUser: UserT = {
  id: 1,
  username: "XxPeterxX",
};

const examplePost: PostT = {
  comments: [],
  id: 1,
  creationTime: "11.11.2022",
  title: "Erster Post",
  content:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  user: exampleUser,
  likes: [],
  dislikes: [],
};

const examplePost2: PostT = {
  comments: [],
  id: 2,
  creationTime: "11.11.2022",
  title: "Zweiter Post",
  content:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  user: exampleUser,
  likes: [],
  dislikes: [],
};

const exampleComment: CommentT = {
  id: 1,
  creationTime: "11.11.2022",
  content: "Das ist eine sehr gut Idee",
  user: exampleUser, //should be list of User objects
  comments: [], //should be list of Comment objects
  post: examplePost,
};

const exampleComment2: CommentT = {
  id: 2,
  creationTime: "15.11.2022",
  content: "Finde ich super!",
  user: exampleUser, //should be list of User objects
  comments: [], //should be list of Comment objects
  post: examplePost2,
};

const posts: PostT[] = [
  { ...examplePost, comments: [exampleComment] },
  { ...examplePost2, comments: [exampleComment2] },
];

export default function App() {
  return (
    <Router>
      <div>
        <nav className={"flex flex-row justify-center items-center h-12"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/:id" element={<DetailedPost posts={posts} />} />
        </Routes>
      </div>
    </Router>
  );
}
