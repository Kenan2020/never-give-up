import React, { useState } from "react";
import { connect } from "react-redux";
import {
  deleteComment,
  updateComment,
  upVoteComment,
  downVoteComment,
} from "../../../../actions/comment";
import LikeDislike from "../LikeDislike";
import ReplyForm from "../Replys/ReplyForm";
import ReplysList from "../Replys/ReplysList";
import TimeDisplay from "../TimeDisplay";
import ReplyButton from "../Replys/ReplyButton";
import DropDown from "../../dropdown/DropDown";
import EditForm from "../EditForm";
import CommentDisplay from "../CommentDisplay";

const Comments = ({
  comment: {
    _id,
    date,
    content,
    user,
    userName,
    avatar,
    upVotes,
    downVotes,
    deleted,
    edit,
  },
  replys,
  authUser,
  deleteComment,
  updateComment,
  upVoteComment,
  downVoteComment,
  style,
}) => {
  const [openReply, setOpenReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [select, setSelect] = useState(null);

  const createReplyArray = () => {
    if (replys) {
      for (const [key, value] of Object.entries(replys)) {
        if (key === _id) {
          return value;
        }
      }
      return [];
    }
  };

  const replyHandler = e => {
    e.preventDefault();
    setOpenReply(!openReply);
  };

  const showReplys = e => {
    e.preventDefault();
    setShowReply(!showReply);
  };
  const deleteHandler = () => {
    deleteComment(_id);
  };

  const dropDonwArray = [
    {
      title: "edit",
      handler: setSelect,
      disabled: deleted ? true : false,
    },
    {
      title: "delete",
      handler: deleteHandler,
      disabled: deleted ? true : false,
    },
  ];

  const authentification = () => (authUser ? authUser._id : false);

  return (
    <div style={style} className="comment-card d-flex mt-4 mb-4  ">
      <img
        style={{ top: 0 }}
        className="userAvatar  mr-3  d-none d-sm-block"
        src={avatar}
        alt=""
      />
      <div className="w-100">
        <div className="d-flex align-items-center mt-0 mb-2">
          <img
            style={{ top: 0 }}
            className="userAvatar unselectable mr-3  d-block d-sm-none"
            src={avatar}
            alt=""
          />
          <button className="button-style name d-inline mr-3">
            {userName}
          </button>
          <TimeDisplay date={date} />
          {user._id === authentification() && (
            <DropDown
              className=" ml-auto mr-5"
              style={{
                letterSpacing: "4px",
                fontWeight: "bolder",
              }}
              title="..."
              array={dropDonwArray}
            />
          )}
        </div>
        {(select === "edit" && (
          <EditForm
            callback={setSelect}
            updateHandler={updateComment}
            content={content}
            commentId={_id}
          />
        )) || (
          <CommentDisplay
            className="comment text-style mb-3 "
            content={content}
            deleted={deleted}
            edit={edit}
          />
        )}
        <div className="d-block">
          <LikeDislike
            commentId={_id}
            votes={{ upVotes, downVotes }}
            upVoteHandler={upVoteComment}
            downVoteHandler={downVoteComment}
          />
          <button
            className="button-style reply-to d-inline ml-4 unselectable"
            onClick={replyHandler}
          >
            REPLY
          </button>
        </div>
        <ReplyForm
          parentCommentId={_id}
          show={openReply}
          setShow={setOpenReply}
        />
        <ReplyButton
          show={showReply}
          replysLength={createReplyArray().length}
          onClickHandler={showReplys}
        />
        <ReplysList
          show={showReply}
          replyArray={createReplyArray()}
          parentCommentId={_id}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  replys: state.comments.replys,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  deleteComment,
  updateComment,
  upVoteComment,
  downVoteComment,
})(Comments);
