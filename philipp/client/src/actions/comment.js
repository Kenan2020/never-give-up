import api from "../utils/api";
import {
  PUT_COMMENT,
  ADD_COMMENT,
  ADD_COMMENTS,
  ADD_REPLY,
  PUT_REPLY,
  ADD_REPLYS,
  RESET_REPLYS,
} from "../actions/types";

///////////////// GET COMMENTS ////////////////////

export const getComments = video => async dispatch => {
  await api.get(`/comment/all/${video.id.videoId}`).then(res => {
    if (res.status === 200) {
      if (res.data.length) {
        res.data.forEach(comment => {
          dispatch(getReplys(comment._id));
        });
      }
      console.log(res.data);
      dispatch({
        type: ADD_COMMENTS,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to get comment" });
    }
  });
};

///////////////// GET REPLYS ////////////////////
export const getReplys = commentId => async dispatch => {
  await api.get(`/comment/all/replies/${commentId}`).then(res => {
    if (res.status === 200) {
      if (res.data.length) {
        dispatch({
          type: ADD_REPLYS,
          payload: res.data,
        });
      } else {
        console.log("no replies found");
      }
    }
  });
};

///////////////// GET RESPONSES ////////////////////
export const getResponses = async commentId => {
  await api.get(`/comment/all/replys/${commentId}`).then(res => {
    if (res.status === 200) {
      if (res.data.length) {
        return res.data;
      } else {
        console.log("Failed to gete replys");
      }
    }
  });
};

//////////////// reset Replys /////////////
export const resetReplys = () => dispatch => {
  dispatch({
    type: RESET_REPLYS,
    payload: {},
  });
};

/////////////////// ADD Comment ///////////////////////
export const addComment = ({ content, videoId }) => async dispatch => {
  const body = JSON.stringify({ content, videoId });
  await api.post("/comment", body).then(res => {
    if (res.status === 200) {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

/////////////////// DELETE COMMENT ///////////////////////

export const deleteComment = commentId => async dispatch => {
  await api.put(`/comment/delete/${commentId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_COMMENT,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

/////////////////// DELETE REPLY ///////////////////////

export const deleteReply = commentId => async dispatch => {
  await api.put(`/comment/delete/${commentId}`).then(res => {
    if (res.status === 200) {
      console.log(res.data);
      dispatch({
        type: PUT_REPLY,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

/////////////////// ADD REPLY ///////////////////////
export const addReply = ({
  content,
  parentCommentId,
  at,
}) => async dispatch => {
  const body = JSON.stringify({ content, parentCommentId, at });

  await api.post("/comment/reply", body).then(res => {
    if (res.status === 200) {
      console.log(res.data);
      dispatch({
        type: ADD_REPLY,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save reply" });
    }
  });
};

////////////////////// UPDATE COMMENT ///////////////////////

export const updateComment = ({ commentId, content }) => async dispatch => {
  const body = JSON.stringify({ content });

  await api.put(`/comment/update/${commentId}`, body).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_COMMENT,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

////////////////////// UPDATE REPLY ///////////////////////

export const updateReply = ({ commentId, content }) => async dispatch => {
  const body = JSON.stringify({ content });

  await api.put(`/comment/update/${commentId}`, body).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_REPLY,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

//////////////////// UPVOTE //////////////////////////

export const upVoteComment = commentId => async dispatch => {
  await api.put(`/comment/upvote/${commentId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_COMMENT,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

//////////////////// DOWNVOTE //////////////////////////

export const downVoteComment = commentId => async dispatch => {
  await api.put(`/comment/downvote/${commentId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_COMMENT,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

//////////////////// UPVOTE REPLY //////////////////////////

export const upVoteReply = commentId => async dispatch => {
  await api.put(`/comment/upvote/${commentId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_REPLY,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};

//////////////////// DOWNVOTE REPLY //////////////////////////

export const downVoteReply = commentId => async dispatch => {
  await api.put(`/comment/downvote/${commentId}`).then(res => {
    if (res.status === 200) {
      dispatch({
        type: PUT_REPLY,
        payload: res.data,
      });
    } else {
      alert({ message: "Failed to save comment" });
    }
  });
};
