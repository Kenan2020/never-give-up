import React from "react";

const ReplyButton = ({ show, replysLength, onClickHandler }) => {
  return (
    replysLength > 0 && (
      <button
        className="button-style reply-button text-color-1 mt-4 mb-2 mb-sm-0 d-inline-block font-weight-bold"
        onClick={onClickHandler}
      >
        {show ? "HIDE" : "SHOW"} {replysLength > 1 ? "REPLYS" : "REPLY"} (
        {replysLength})
      </button>
    )
  );
};

export default ReplyButton;
