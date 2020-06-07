import React, { useState } from "react";
import { connect } from "react-redux";

const CommentsButton = ({
  className,
  setShow,
  show,
  activeText,
  deactiveText,
  videoId,
  comments,
}) => {
  comments = comments[videoId];
  const [text, setText] = useState(deactiveText);

  const commetentsCount = () => {
    if (comments) {
      console.log(comments);
      if (comments[0]) {
        return comments.length;
      }
    }
    return 0;
  };
  return comments ? (
    <button
      className={`button-style ${className}`}
      onClick={() => {
        setShow(!show);
        if (!show) setText(activeText);
        else setText(deactiveText);
      }}
    >
      {text + `(${commetentsCount()})`}
    </button>
  ) : null;
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps)(CommentsButton);
