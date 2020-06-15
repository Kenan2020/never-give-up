import React from "react";

const CommentDisplay = ({ className, content, deleted, edit, at }) => {
  console.log(at);
  const getTimeStamp = date => {
    const calenderDate = new Date(date);
    let day = calenderDate.getUTCDate();
    day = day.toString().length === 1 ? "0" + day : day;
    let month = calenderDate.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    const year = calenderDate.getFullYear();
    let hours = calenderDate.getHours();
    hours = hours.toString().length === 1 ? "0" + hours : hours;
    let mins = calenderDate.getMinutes();
    mins = mins.toString().length === 1 ? "0" + mins : mins;
    let sec = calenderDate.getSeconds();
    sec = sec.toString().length === 1 ? "0" + sec : sec;
    return { day, month, year, hours, mins, sec };
  };

  const renderAtTag = at =>
    at ? <span className="responseTag">@{at.userName} </span> : null;

  const renderCommentContent = () => {
    if (deleted) {
      const { day, month, year, hours, mins, sec } = getTimeStamp(deleted.date);
      return (
        <>
          <span className="deletion-timestamp">{`${day}-${month}-${year} | ${hours}:${mins}:${sec}`}</span>
          {renderAtTag(at)}
          <span className="deletedMsg">[{deleted.msg}]</span>
        </>
      );
    } else if (edit) {
      const { day, month, year, hours, mins, sec } = getTimeStamp(edit.date);
      return (
        <>
          <span className="deletion-timestamp">{`${day}-${month}-${year} | ${hours}:${mins}:${sec}`}</span>
          <span className="editMsg">[Edit:] </span>

          {renderAtTag(at)}
          {content}
        </>
      );
    } else {
      return (
        <>
          {renderAtTag(at)}
          {content}
        </>
      );
    }
  };
  return (
    <div className={`font-weight-normal ${className}`}>
      {renderCommentContent()}
    </div>
  );
};

export default CommentDisplay;
