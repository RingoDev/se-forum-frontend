import React, { ChangeEventHandler, useState } from "react";
import Button from "./Button";

interface Props {
  visibility: boolean;
  handleCommentCreate: (comment: string) => void;
  handleAbort: () => void;
}

export default function Comment({
  visibility,
  handleCommentCreate,
  handleAbort,
}: Props) {
  const [commentText, setCommentText] = useState<string>();

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    if (commentText !== undefined && commentText !== "") {
      handleCommentCreate(commentText);
    }
  };

  return visibility ? (
    <div className={"p-2"}>
      <div className={"flex flex-row justify-around"}>
        <textarea
          onChange={handleInputChange}
          className="border border-gray-400 w-full mr-2 rounded p-4"
        />
        <div className={"grid grid-cols-1 gap-2"}>
          <Button onClick={handleSubmit}>Absenden</Button>
          <Button onClick={handleAbort}>Abbrechen</Button>
        </div>
      </div>
    </div>
  ) : null;
}
