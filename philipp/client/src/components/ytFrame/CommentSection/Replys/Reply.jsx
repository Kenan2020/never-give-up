import React, { useState } from "react";
import { connect } from "react-redux";
import LikeDislike from "../LikeDislike";
import TimeDisplay from "../TimeDisplay";
import EditForm from "../EditForm";
import DropDown from "../../dropdown/DropDown";
import CommentDisplay from "../CommentDisplay";
import ReplyForm from "./ReplyForm";
import {
  deleteReply,
  updateReply,
  upVoteReply,
  downVoteReply,
} from "../../../../actions/comment";

const Reply = ({
  reply: {
    _id,
    date,
    content,
    user,
    userName,
    avatar,
    upVotes,
    downVotes,
    replyTo,
    at,
    edit,
    deleted,
  },
  authUser,
  deleteReply,
  updateReply,
  upVoteReply,
  downVoteReply,
}) => {
  const [openReply, setOpenReply] = useState(false);
  const [select, setSelect] = useState(null);

  const replyHandler = e => {
    e.preventDefault();
    setOpenReply(!openReply);
  };

  const deleteHandler = () => {
    deleteReply(_id);
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
    <div className="comment-card reply-card d-flex mt-sm-4 mb-sm-4  mt-1 mb-1">
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
            className="userAvatar unselectable mr-3 d-block d-sm-none"
            src={avatar}
            alt=""
          />
          <button className="button-style name d-inline mr-3">
            {userName}
          </button>
          <TimeDisplay date={date} />
          {user._id === authentification() && (
            <DropDown
              className=" ml-auto mr-5 d-inline"
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
            updateHandler={updateReply}
            content={content}
            commentId={_id}
          />
        )) || (
          <CommentDisplay
            className="comment mb-3"
            content={content}
            deleted={deleted}
            edit={edit}
            at={at}
          />
        )}
        <div className="d-block">
          <LikeDislike
            commentId={_id}
            votes={{ upVotes, downVotes }}
            upVoteHandler={upVoteReply}
            downVoteHandler={downVoteReply}
          />
          <button
            className="button-style reply-to d-inline ml-4 unselectable"
            onClick={replyHandler}
          >
            REPLY
          </button>
        </div>
        <ReplyForm
          show={openReply}
          setShow={setOpenReply}
          parentCommentId={replyTo}
          at={_id}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  deleteReply,
  updateReply,
  upVoteReply,
  downVoteReply,
})(Reply);
