import React, { useState } from "react";
import CommentForm from "./Comments/CommentForm";
import Ratings from "../rating/Ratings";
import CommentsButton from "./CommentsButton";
import CommentsList from "./Comments/CommentsList";

const CommentSection = ({ className, videoId }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={className}>
      <div className="d-flex">
        <CommentsButton
          className="comment-button"
          videoId={videoId}
          show={show}
          setShow={setShow}
          activeText={"hide comments"}
          deactiveText={"show comments"}
        />
        <Ratings />
      </div>
      {show && (
        <div>
          <CommentForm className="mt-3 " videoId={videoId} />
          <CommentsList className="someclass" videoId={videoId} />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
