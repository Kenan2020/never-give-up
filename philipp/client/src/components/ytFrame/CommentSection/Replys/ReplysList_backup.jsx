import React from "react";
import Reply from "./Reply";

const ReplysList = ({ show, replyArray, parentCommentId }) => {
  // console.log("replyArray", replyArray);
  const reOrderdArray = () => {
    let replyArrayCopy = [...replyArray];
    let atArray = [];
    let replyArray2 = [];

    if (replyArrayCopy.length) {
      replyArrayCopy = replyArrayCopy.filter(
        reply => reply.replyTo === parentCommentId
      );

      for (let i = 0; i < replyArrayCopy.length; ) {
        if (replyArrayCopy[i].at) {
          atArray = [...atArray, ...replyArrayCopy.splice(i, 1)];
        } else {
          i++;
        }
      }

      for (let i = 0; i < replyArrayCopy.length; i++) {
        replyArray2 = [
          ...replyArray2,
          replyArrayCopy[i],
          ...atArray.filter(reply => replyArrayCopy[i]._id === reply.at._id),
        ];
      }
      for (let i = 0; i < replyArray2.length; i++) {
        if (replyArray2[i].at) {
          for (let e = 0; e < atArray.length; e++) {
            if (replyArray2[i]._id === atArray[e].at._id) {
              replyArray2.splice(i + 1, 0, atArray[e]);
            }
          }
        }
      }
      return replyArray2;
    }
    return [];
  };
  return (
    show && (
      <div style={{ width: "inherit" }} className="reply-list">
        {reOrderdArray().map((reply, index) => (
          <Reply reply={reply} key={index} />
        ))}
      </div>
    )
  );
};

export default ReplysList;
/*  <Spinner animation="border" role="status" />) || */
