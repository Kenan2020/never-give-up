import React, { useState } from "react";
import { connect } from "react-redux";
import { addReply } from "../../../../actions/comment";
import { setDialog } from "./../../../../actions/dialog";
import TextArea from "../textarea/TextArea";

import PropTypes from "prop-types";

const ReplyForm = ({
  show,
  setShow,
  callback,
  at,
  addReply,
  setDialog,
  parentCommentId,
  isAuthenticated,
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

ReplyForm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func.isRequired,
  at: PropTypes.string,
  addReply: PropTypes.func.isRequired,
  setDialog: PropTypes.func,
  parentCommentId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addReply, setDialog })(ReplyForm);
