import React from "react";
import { connect } from "react-redux";
import { getComments } from "../../actions/comment";
import CommentSection from "./CommentSection/CommentSection";
import VideoFrame from "./video/VideoFrame";
import "./style/ytframe.scss";

const YTFrame = ({ src, getComments, className }) => {
  getComments({ id: { videoId: src } });
  return (
    <div className={className}>
      <div className="row justify-contetn-center">
        <div className="col mb-3">
          <VideoFrame src={src} />
        </div>
      </div>
      <CommentSection videoId={src} />
    </div>
  );
};

export default connect(null, { getComments })(YTFrame);
