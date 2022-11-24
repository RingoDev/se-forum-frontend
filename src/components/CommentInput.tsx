import React from "react";

export default function Comment({ visibility, handleCommentSent }: { visibility: any, handleCommentSent: any }) {

  let currentInput = ""

  const handleInputChange = (e: string) => {
    currentInput = e
  }

  return (
    visibility ?
      <div className={"py-12 px-6"}>
        <div className={"flex flex-row justify-around"}>
          <textarea onChange={e => handleInputChange(e.target.value)} className="border border-black" />
          <div className={"grid grid-cols-1 pt-3"}>
            <button onClick={() => handleCommentSent(currentInput)}>Absenden</button>
          </div>
        </div>
      </div>
      : null
  );
}
