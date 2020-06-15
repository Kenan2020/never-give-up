import React, { useState } from "react";
import TextArea from "./textarea/TextArea";

const EditForm = ({ callback, updateHandler, content, commentId }) => {
  const [comment, setComment] = useState(content);

  const submitHandler = e => {
    e.preventDefault();
    console.log(commentId, content);
    updateHandler({ commentId, content: comment });
    setComment("");
    callback(null);
  };

  const cancelHandler = e => {
    e.preventDefault();
    setComment("");
    callback(null);
  };

  return (
    <form className="edit-form " onSubmit={submitHandler}>
      <TextArea
        className="edit-area"
        value={comment}
        onChangeHandler={setComment}
        placeholder="edit"
      />
      <div className="mb-1">
        <input
          type="button"
          onClick={cancelHandler}
          className="btn btn-outline-primary mx-1"
          value="Cancel"
        />
        <input type="submit" className="btn btn-primary mx-1" value="Submit" />
      </div>
    </form>
  );
};

export default EditForm;
