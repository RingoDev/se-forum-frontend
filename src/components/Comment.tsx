import React, { useState, useEffect, useRef } from "react";
import { CommentT, UserT, PostT } from "../types";
import useEffectSkipInitial from "../util/util";
import { getCurrentDateTime, } from "../util/util";
import CommentInput from "./CommentInput";

interface Props {
  comment: CommentT;
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

export default function Comment({ comment }: Props) {

  const [commentInputIsVisible, setCommentInputVisibility] = useState(false);
  const [comments, setComments] = useState<CommentT[]>(comment.comments);
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
    comment.comments.push(newComment)
    setComments(comment.comments)
    handleInputVisibility()
  }

  const handleInputVisibility = () => {
    setCommentInputVisibility(!commentInputIsVisible)
  }

  return (
    <div ref={inputRef} className={"py-6 px-6"}>
      <div className={"border-l-2 border-b-2  px-6"}>
        <div>{comment.content}</div>
        <div className={"flex flex-row justify-between"}>
          <button onClick={handleInputVisibility}>  <span className="material-symbols-outlined">
            comment
          </span> Kommentieren</button>
          <div className={"grid grid-cols-1 pt-6"}>
            <span>{comment.creationTime}</span>
            <span>Ersteller: {comment.user.username}</span>
          </div>
        </div>
        <CommentInput visibility={commentInputIsVisible} handleCommentSent={handleCommentSent}></CommentInput>
        {comments ? comments.map((c) => (
          <div key={c.id}>
            <Comment comment={c} />
          </div>
        ))
          : null
        }
      </div>
    </div>
  );
}
