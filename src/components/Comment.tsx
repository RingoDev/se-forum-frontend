import React, { useRef, useState } from "react";
import { CommentT } from "../types";
import useEffectSkipInitial from "../util/util";
import CommentInput from "./CommentInput";

interface Props {
  comment: CommentT;
  addSubComment: (parentCommentId: string, commentText: string) => void;
}

//TODO: submit to backend

export default function Comment({ comment, addSubComment }: Props) {
  const [commentInputIsVisible, setCommentInputVisibility] = useState(false);
  const inputRef = useRef<null | HTMLDivElement>(null);

  useEffectSkipInitial(() => {
    if (inputRef.current && !commentInputIsVisible) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [commentInputIsVisible]);

  const handleCommentCreate = (commentText: string) => {
    console.log(
      "handling creation of comment with text in comment",
      commentText,
      comment
    );

    addSubComment(comment.id, commentText);
    toggleInputVisibility();
  };

  const toggleInputVisibility = () => {
    setCommentInputVisibility(!commentInputIsVisible);
  };

  return (
    <div ref={inputRef} className={"py-6 pl-2"}>
      <div className={"border-l-2 border-b-2  pl-2 pb-2"}>
        <div>{comment.content}</div>
        <div className={"flex flex-row justify-between"}>
          {!commentInputIsVisible ? (
            <button
              onClick={toggleInputVisibility}
              className={"flex items-center gap-2"}
            >
              <span className="material-symbols-outlined"> comment </span>
              <span>Kommentieren</span>
            </button>
          ) : null}
          <div className={"grid grid-cols-1 pt-6"}>
            <span>{comment.creationTime.substring(0, 19).replace("T", ", ")}</span>
            <span>Ersteller: {comment.user.username}</span>
          </div>
        </div>
        <CommentInput
          visibility={commentInputIsVisible}
          handleCommentCreate={handleCommentCreate}
          handleAbort={toggleInputVisibility}
        />
        {comment.subcomments
          ? comment.subcomments.map((c) => {
              const handleAddSubComment = (
                parentCommentId: string,
                commentText: string
              ) => {
                // const clonedComments = comment.subcomments.slice()
                // clonedComments[index] = commentToUpdate
                // handleCommentUpdate({...comment,subcomments:clonedComments})

                addSubComment(parentCommentId, commentText);
              };
              return (
                <div key={c.id}>
                  <Comment comment={c} addSubComment={handleAddSubComment}  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
