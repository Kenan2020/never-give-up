import React, { useState } from "react";
import { connect } from "react-redux";
import { addReply } from "../../../../actions/comment";
import TextArea from "../textarea/TextArea";

const ReplyForm = ({ show, setShow, at, addReply, parentCommentId }) => {
  const [comment, setComment] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    addReply({ content: comment, parentCommentId, at });
    setComment("");
    setShow(false);
  };

  const cancelHandler = e => {
    e.preventDefault();
    setComment("");
    setShow(false);
  };

  return (
    show && (
      <form className="commentForm mt-3 " onSubmit={submitHandler}>
        <TextArea
          value={comment}
          onChangeHandler={setComment}
          placeholder="add a reply"
        />
        {comment && (
          <div className="mb-1">
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
    )
  );
};

export default connect(null, { addReply })(ReplyForm);
