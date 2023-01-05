import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CommentDtoT, PostT, Like, Dislike } from "../types";
import axios from "axios";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { UserContext } from "../util/util";

export default function DetailedPost() {
  const postId = useParams().id;

  const [post, setPost] = useState<PostT>();
  const loggedInUser = useContext(UserContext);

  const [likeStyle, setLikeStyle] = useState<String>();
  const [dislikeStyle, setDislikeStyle] = useState<String>();


  useEffect(() => {
    axios
      .get<PostT>("http://localhost:8080/post/" + postId)
      .then((r) => {
        if (r.status === 200) {
          setPost(r.data);

          if(loggedInUser) {
            r.data.likes.forEach(like => {
              if(like.user.id==loggedInUser.id) {
                setLikeStyle("bg-green-600")
              }
            })

            r.data.dislikes.forEach(dislike => {
              if(dislike.user.id==loggedInUser.id) {
                setDislikeStyle("bg-red-600")
              }
            })
          }


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
          toggleInputVisibility()
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

  const handleLike =  () => {
    if (post === undefined || loggedInUser === null) return;
    const like: Partial<Like> = {
      user: loggedInUser,
      post: post.id
    };

    axios
      .put<PostT, any, Partial<Like>>(
        "http://localhost:8080/post/like" , like 
      )
      .then((r) => {
        if (r.status === 200) {
          toggleLikeStyle(r);
          setPost(r.data);
        } else {
          console.warn(r);
        }
      })
      .catch(console.error);
  };

  const handleDislike =  () => {
    if (post === undefined || loggedInUser === null) return;
    const dislike: Partial<Dislike> = {
      user: loggedInUser,
      post: post.id
    };

    axios
      .put<PostT, any, Partial<Dislike>>(
        "http://localhost:8080/post/dislike" , dislike 
      )
      .then((r) => {
        if (r.status === 200) {  
          toggleLikeStyle(r);  
          setPost(r.data);             
        } else {
          console.warn(r);
        }
      })
      .catch(console.error);
  };

  const toggleLikeStyle = (r:any) => {
    if (post === undefined || loggedInUser === null) return;
    if(r.data.likes.length>post.likes.length) {
      setLikeStyle("bg-green-600")
    } else {
      setLikeStyle("");
    }

    if(r.data.dislikes.length>post.dislikes.length) {
      setDislikeStyle("bg-red-600")
    } else {
      setDislikeStyle("");
    }
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
        Erstellt von {" "}
        <Link className={"text-blue-700"} to={"/user/" + post.user.id}>
          {post.user.username}
        </Link>{", "}
       {post.creationTime.substring(0, 19).replace("T", ", ")}
      </div>
      <div>{post.content}</div>
      <hr className={"my-4"} />
      <div className={"flex flex-row justify-between"}>
  


        <div className={"flex justify-end w-full"}>
            

        <button
              onClick={() => handleLike()}
              className={`flex items-center gap-2 border border-slate-900 rounded-l-lg ${likeStyle}` }
            >
          <span className="material-symbols-outlined"> thumb_up </span>
          <span className={"mr-1"}>     {post.likes ? post.likes.length : 0}</span>
            </button>
    
        <button
          onClick={() => handleDislike()}
          className={`flex items-center gap-2 border border-slate-900 rounded-r-lg mr-2 ${dislikeStyle}` }
          >
      <span className="material-symbols-outlined"> thumb_down </span>
      <span className={"mr-1"}>    {post.dislikes ? post.dislikes.length : 0}</span>
        </button>
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
            <Comment comment={c} addSubComment={handleAddSubCommentToComment}  />
          </div>
        );
      })}
    </div>
  );
}
