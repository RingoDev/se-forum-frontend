import { Link, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { PostT, UserT, CommentT } from "../types";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import useEffectSkipInitial, { getCurrentDateTime } from "../util/util";

interface Props {
  posts: PostT[];
}

const exampleUser: UserT = {
  id: 1,
  username: "XxPeterxX",
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
  post: examplePost2,
};


export default function DetailedPost({ posts }: Props) {
  const id = Number(useParams().id);
  const post = posts.filter((p) => p.id === id)[0];

  const [commentInputIsVisible, setCommentInputVisibility] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes.length);
  const [dislikes, setDislikes] = useState(post.dislikes.length);
  const inputRef = useRef<null | HTMLDivElement>(null)

  useEffectSkipInitial(() => {
    if (inputRef.current && !commentInputIsVisible) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [commentInputIsVisible]);

  const handleCommentSent = (input: string) => {
    const newComment = structuredClone(exampleComment)
    newComment.content = input
    newComment.creationTime = getCurrentDateTime()
    post.comments.push(newComment)
    setComments(post.comments)
    handleInputVisibility()
  }

  const handleInputVisibility = () => {
    setCommentInputVisibility(!commentInputIsVisible)
  }

  const handleLike = (type: any) => {
    type > 0 ? setLikes(likes + 1) : setDislikes(dislikes + 1)
  }

  if (post === undefined) {
    return (
      <div>
        Post with id {id} was not found! <Link to={"/"}>Go Back</Link>
      </div>
    );
  }
  return (
    <div className={"max-w-2xl p-12 mx-auto"} ref={inputRef}>
      <h1 className={"text-2xl text-center mb-4"}>{post.title}</h1>
      <div className={"text-end mb-8"}>
        erstellt von: {post.user.username} am {post.creationTime}
      </div>
      <div>{post.content}</div>
      <div className={"flex flex-row justify-between"}>
        <div>Likes: {likes}</div>
        <button onClick={() => handleLike(1)}>
          <span className="material-symbols-outlined"> thumb_up </span>
        </button>
        <div>Dislikes: {dislikes}</div>
        <button onClick={() => handleLike(-1)}>
          <span className="material-symbols-outlined"> thumb_down </span>
        </button>
        <button onClick={handleInputVisibility}>
          <span className="material-symbols-outlined"> comment </span>
          Kommentieren
        </button>
      </div>
      <CommentInput visibility={commentInputIsVisible} handleCommentSent={handleCommentSent}></CommentInput>
      {comments.map((c) => (
        <div key={c.id}>
          <Comment comment={c} />
        </div>
      ))}
    </div >
  );
}
