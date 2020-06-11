import React from "react";
import { connect } from "react-redux";
import { setDialog } from "./../../../actions/dialog";

import PropTypes from "prop-types";

const LikeDislike = ({
  commentId,
  votes: { upVotes, downVotes },
  upVoteHandler,
  downVoteHandler,
  authUser,
  setDialog,
  isAuthenticated,
}) => {
  const checkAuth = () => {
    if (!isAuthenticated) {
      return setDialog({
        title: "Account required",
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
    }
  };

  const likesHandler = e => {
    e.preventDefault();
    checkAuth();
    upVoteHandler(commentId);
  };

  const dislikesHandler = e => {
    e.preventDefault();
    checkAuth();
    downVoteHandler(commentId);
  };

  const authentification = () => (authUser ? authUser._id : false);

  const setStyle = VotesArray => {
    if (VotesArray.length) {
      for (const downVote of VotesArray) {
        if (downVote.user === authentification()) {
          return "selected";
        } else {
          return;
        }
      }
    } else {
      return;
    }
  };

  return (
    <div className="like-dislike d-inline">
      <button
        className={`fas fa-thumbs-up mr-3 button-style  unselectable  ${setStyle(
          upVotes
        )}`}
        onClick={likesHandler}
      >
        <span className="px-2 unselectable">{upVotes.length}</span>
      </button>
      <button
        className={`fas fa-thumbs-down mr-3 button-style  unselectable ${setStyle(
          downVotes
        )}`}
        onClick={dislikesHandler}
      >
        <span className="px-2 unselectable">{downVotes.length}</span>
      </button>
    </div>
  );
};

LikeDislike.propTypes = {
  commentId: PropTypes.string.isRequired,
  votes: PropTypes.object,
  upVoteHandler: PropTypes.func.isRequired,
  downVoteHandler: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  setDialog: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  authUser: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setDialog })(LikeDislike);
