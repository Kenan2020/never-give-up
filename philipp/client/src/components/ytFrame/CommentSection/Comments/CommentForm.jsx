import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../../../actions/comment";
import TextArea from "../textarea/TextArea";

const CommentForm = ({ className, addComment, videoId }) => {
  const [comment, setComment] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    console.log("commentForm: ", comment, videoId);
    addComment({ content: comment, videoId });
    setComment("");
  };

  const cancelHandler = e => {
    e.preventDefault();
    setComment("");
  };
  return (
    <form className={`commentForm ${className}`} onSubmit={submitHandler}>
      <TextArea
        value={comment}
        onChangeHandler={setComment}
        placeholder="add a comment"
      />
      {comment && (
        <div>
          <input
            type="button"
            onClick={cancelHandler}
            className="btn btn-outline-primary mx-1"
            value="Cancel"
          />
          <input
            type="submit"
            className="btn btn-primary mx-1"
            value="Comment"
          />
        </div>
      )}
    </form>
  );
};

export default connect(null, { addComment })(CommentForm);

//const dateInst = new Date();
//date: `${dateInst.getHours()}:${dateInst.getMinutes()}:${dateInst.getSeconds()} - ${dateInst.getDate()}.${dateInst.getMonth()}.${dateInst.getFullYear()}`,
