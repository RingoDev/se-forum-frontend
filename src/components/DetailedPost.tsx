import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CommentDtoT, PostT } from "../types";
import axios from "axios";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { UserContext } from "../util/util";

export default function DetailedPost() {
  const postId = useParams().id;

  const [post, setPost] = useState<PostT>();
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    axios
      .get<PostT>("http://localhost:8080/post/" + postId)
      .then((r) => {
        if (r.status === 200) {
          setPost(r.data);
        } else {
          console.log(r);
        }
      })
      .catch(console.log);
  }, []);

  const [commentInputIsVisible, setCommentInputVisibility] = useState(false);
  // const [comments, setComments] = useState(post?.comments);
  // const [likes, setLikes] = useState(post?.likes.length);
  // const [dislikes, setDislikes] = useState(post?.dislikes.length);
  const inputRef = useRef<HTMLDivElement>(null);

  //
  // useEffectSkipInitial(() => {
  //   if (inputRef.current && !commentInputIsVisible) {
  //     inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  //   }
  // }, [commentInputIsVisible]);
  //
  const handleAddCommentToPost = (commentText: string) => {
    if (post === undefined || loggedInUser === null) return;

    const comment: CommentDtoT = {
      subcomments: [],
      content: commentText,
      user: loggedInUser.id,
    };

    axios
      .post<PostT, any, CommentDtoT>(
        "http://localhost:8080/post/" + post.id + "/" + "comment",
        comment
      )
      .then((r) => {
        if (r.status === 200) {
          console.log("Kommentar hinzugefügt!");
          setPost(r.data);
        } else {
          console.warn(r);
        }
      })
      .catch(console.error);
  };

  const handleAddSubCommentToComment = (
    parentCommentId: string,
    commentText: string
  ) => {
    if (post === undefined || loggedInUser === null) return;

    const comment: CommentDtoT = {
      subcomments: [],
      content: commentText,
      user: loggedInUser.id,
    };

    axios
      .post<PostT, any, CommentDtoT>(
        "http://localhost:8080/post/" +
          post.id +
          "/" +
          "comment/" +
          parentCommentId,
        comment
      )
      .then((r) => {
        if (r.status === 200) {
          console.log("Unterkommentar hinzugefügt!");
          setPost(r.data);
        } else {
          console.warn(r);
        }
      })
      .catch(console.error);
  };

  // const handleUpdateComments = (comments: CommentT[]) => {
  //     if (post === undefined || loggedInUser === null) return
  //
  //     const betterComments =
  //
  //
  //         axios
  //             .post<PostT>("http://localhost:8080/post/update",
  //                 {...post, comments})
  //             .then((r) => {
  //                 if (r.status === 200) {
  //                     console.log("Kommentar upgedatet!");
  //                     setPost(r.data)
  //                 } else {
  //                     console.warn(r);
  //                 }
  //             })
  //             .catch(console.error);
  // };

  const toggleInputVisibility = () => {
    setCommentInputVisibility(!commentInputIsVisible);
  };
  //
  // const handleLike = (type: any) => {
  //   type > 0 ? setLikes(likes + 1) : setDislikes(dislikes + 1);
  // };

  if (post === undefined) {
    return (
      <div>
        Post with id {postId} was not found! <Link to={"/"}>Go Back</Link>
      </div>
    );
  }
  return (
    <div className={"max-w-4xl p-12 mx-auto"} ref={inputRef}>
      <h1 className={"text-2xl text-center mb-4"}>{post.title}</h1>
      <div className={"text-end mb-8"}>
        erstellt von:{" "}
        <Link className={"text-blue-700"} to={"/user/" + post.user.id}>
          {post.user.username}
        </Link>{" "}
        am {post.creationTime}
      </div>
      <div>{post.content}</div>
      <hr className={"my-4"} />
      <div className={"flex flex-row justify-between"}>
        {/*<div>Likes: {likes}</div>*/}
        {/*<button onClick={() => handleLike(1)}>*/}
        {/*  <span className="material-symbols-outlined"> thumb_up </span>*/}
        {/*</button>*/}
        {/*<div>Dislikes: {dislikes}</div>*/}
        {/*<button onClick={() => handleLike(-1)}>*/}
        {/*  <span className="material-symbols-outlined"> thumb_down </span>*/}
        {/*</button>*/}
        <div className={"flex justify-end w-full"}>
          {!commentInputIsVisible ? (
            <button
              onClick={toggleInputVisibility}
              className={"flex items-center gap-2"}
            >
              <span className="material-symbols-outlined"> comment </span>
              <span>Kommentieren</span>
            </button>
          ) : null}
        </div>
      </div>
      <CommentInput
        visibility={commentInputIsVisible}
        handleCommentCreate={handleAddCommentToPost}
        handleAbort={toggleInputVisibility}
      />
      {post.comments.map((c) => {
        return (
          <div key={c.id}>
            <Comment comment={c} addSubComment={handleAddSubCommentToComment} />
          </div>
        );
      })}
    </div>
  );
}
