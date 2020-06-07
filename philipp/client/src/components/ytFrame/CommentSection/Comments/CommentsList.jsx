import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { connect } from "react-redux";
import Spinner from "./../../Spinner";
import CommentsListRender from "./CommentsListRender";

import { useTransition, useSpring, animated } from "react-spring";
/* 
import { useMeasure, usePrevious } from "./helpers"; */

import CommentsButton from "./../CommentsButton";
import DropDown from "./../../dropdown/DropDown";

const CommentsList = ({ className, comments, videoId, replys, loading }) => {
  comments = comments[videoId];
  const [show, setShow] = useState(false);
  const [sorting, setSorting] = useState("Relevant");
  const [commentsArray, setCommentsArray] = useState(null);

  const sortComments = () => {
    let finalComments = [...commentsArray];

    if (finalComments[0]) {
      if (sorting === "Upvotes") {
        finalComments.sort((x, y) => y.upVotes.length - x.upVotes.length);
      } else if (sorting === "newest to oldest") {
        finalComments.reverse();
      } else if (sorting === "Relevant") {
        finalComments.sort((x, y) => {
          y =
            y.upVotes.length +
            y.downVotes.length +
            (replys[y._id] ? replys[y._id].length : 0);
          x =
            x.upVotes.length +
            x.downVotes.length +
            (replys[x._id] ? replys[x._id].length : 0);
          return y - x;
        });
      }
      if (show) {
        return finalComments;
      } else {
        return finalComments.length > 2
          ? [finalComments[0], finalComments[1]]
          : finalComments;
      }
    } else {
      return [];
    }
  };

  useEffect(() => {
    setCommentsArray(comments ? comments : null);
  }, [comments]);

  const sortHander = selection => {
    setSorting(selection);
  };

  return (
    <>
      <Spinner
        show={loading}
        style={{ height: "12rem", width: "12rem" }}
        className="d-flex justify-content-center "
      />
      {commentsArray ? (
        <div className={className}>
          <div className="d-flex">
            <DropDown
              className="d-inline ml-auto mr-5"
              title={"SORT BY:"}
              array={[
                { title: "Relevant", handler: sortHander },
                { title: "oldest to newest", handler: sortHander },
                { title: "newest to oldest", handler: sortHander },
                { title: "Upvotes", handler: sortHander },
              ]}
              activeDefaultItem={0}
            />
          </div>

          {commentsArray ? (
            <CommentsListRender show={show} array={sortComments()} />
          ) : null}

          {commentsArray.length > 2 ? (
            <CommentsButton
              className="comment-button mt-1 mb-5 ml-sm-0 ml-3 d-block"
              videoId={videoId}
              show={show}
              setShow={setShow}
              activeText={"show less comments"}
              deactiveText={"show all comments"}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  replys: state.comments.replys,
  loading: state.comments.loading,
});

export default connect(mapStateToProps)(CommentsList);
