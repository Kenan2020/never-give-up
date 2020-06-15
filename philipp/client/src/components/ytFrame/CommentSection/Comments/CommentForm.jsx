import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../../../actions/comment";
import { setDialog } from "./../../../../actions/dialog";
import TextArea from "../textarea/TextArea";
import PropTypes from "prop-types";

const CommentForm = ({
  isAuthenticated,
  setDialog,
  className,
  addComment,
  videoId,
}) => {
  const [comment, setComment] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    if (!isAuthenticated)
      setDialog({
        title: "Login required",
        msg: "Please login to make a comment!",
        alertType: "primary",
        buttons: [
          {
            title: "login",
            color: "primary",
            href: "http://localhost:3000/login",
          },
        ],
      });

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

CommentForm.propTypes = {
  className: PropTypes.string,
  addComment: PropTypes.func.isRequired,
  setDialog: PropTypes.func,
  videoId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addComment, setDialog })(CommentForm);

//const dateInst = new Date();
//date: `${dateInst.getHours()}:${dateInst.getMinutes()}:${dateInst.getSeconds()} - ${dateInst.getDate()}.${dateInst.getMonth()}.${dateInst.getFullYear()}`,
