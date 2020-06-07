import React, { useState, useEffect } from "react";
import ReplyListRender from "./ReplyListRender";

function spliceArrayItems(array, callback) {
  let output = [];
  for (let i = 0; i < array.length; ) {
    if (callback(array[i])) {
      output = [...output, ...array.splice(i, 1)];
    } else {
      i++;
    }
  }
  return output;
}

function insertItemIf(mainArr, insertArr, callback) {
  let output = [];
  for (let i = 0; i < mainArr.length; i++) {
    output = [
      ...output,
      mainArr[i],
      ...insertArr.filter(reply => callback(mainArr[i], reply)),
    ];
    insertArr = insertArr.filter(reply => !callback(mainArr[i], reply));
  }

  if (insertArr.length === 0) {
    return output;
  } else {
    return insertItemIf(output, insertArr, callback);
  }
}

const ReplysList = ({ show, replyArray, parentCommentId }) => {
  const [replys, setRepys] = useState(null);
  const reOrderdArray = () => {
    // let atArray = [];

    // copy of replies
    let replyArrayCopy = [...replys];

    // filter the replies that are used for this instance
    if (replyArrayCopy.length) {
      replyArrayCopy = replyArrayCopy.filter(
        reply => reply.replyTo === parentCommentId
      );
      // seperate replies form comments
      let atArray = spliceArrayItems(replyArrayCopy, item => item.at);

      // insert replies to comments in right order and nested if needed
      replyArrayCopy = insertItemIf(
        replyArrayCopy,
        atArray,
        (x, y) => x._id === y.at._id
      );

      return replyArrayCopy;
    }
    return [];
  };
  useEffect(() => {
    setRepys(replyArray);
  }, [replyArray]);
  return show && replys ? (
    <div style={{ width: "inherit" }} className="reply-list">
      <ReplyListRender array={reOrderdArray()} />
    </div>
  ) : null;
};

export default ReplysList;
