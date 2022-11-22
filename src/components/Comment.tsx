import React from "react";
import { CommentT } from "../types";

interface Props {
  comment: CommentT;
}

export default function Comment({ comment }: Props) {
  return (
    <div className={"py-12 px-6"}>
      <div>{comment.content}</div>

      <div className={"flex flex-row justify-between"}>
        <button>Kommentieren</button>
        <div className={"grid grid-cols-1 pt-6"}>
          <span>{comment.creationTime}</span>
          <span>Ersteller: {comment.user.username}</span>
        </div>
      </div>
    </div>
  );
}
