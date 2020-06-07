import React from "react";
import { connect } from "react-redux";

const VideoFrame = ({ src }) => {
  return (
    <>
      <div className="video-container-wrapper">
        <div className="video-container">
          <iframe
            className="video"
            src={`https://www.youtube.com/embed/${src}`}
            frameBorder="0"
            allowFullScreen
            title="Video"
          />
        </div>
      </div>
    </>
  );
};

export default connect(null)(VideoFrame);
