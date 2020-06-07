import React from "react";
import { connect } from "react-redux";

const LikeDislike = ({
  commentId,
  votes: { upVotes, downVotes },
  upVoteHandler,
  downVoteHandler,
  authUser,
}) => {
  const likesHandler = e => {
    e.preventDefault();
    upVoteHandler(commentId);
  };

  const dislikesHandler = e => {
    e.preventDefault();
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
const mapStateToProps = state => ({
  authUser: state.auth.user,
});

export default connect(mapStateToProps)(LikeDislike);
