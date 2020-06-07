import React, { useState } from "react";

const TimeDisplay = ({ date }) => {
  const [displayToggle, setDisplayToggle] = useState(true);

  const timeDiff = () => {
    const dateInst = new Date(date);
    let dateDiff = Date.now() - dateInst;
    const month = Math.floor(dateDiff / 1000 / 60 / 60 / 24 / 30);
    dateDiff -= month * 1000 * 60 * 60;
    const days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
    dateDiff -= days * 1000 * 60 * 60;
    const hours = Math.floor(dateDiff / 1000 / 60 / 60);
    dateDiff -= hours * 1000 * 60 * 60;
    const min = Math.floor(dateDiff / 1000 / 60);
    dateDiff -= min * 1000 * 60;
    const sec = Math.floor(dateDiff / 1000);
    dateDiff -= sec * 1000;
    return month
      ? `${month} month ago`
      : days
      ? `${days} days  ago`
      : hours
      ? `${hours} hours  ago`
      : min
      ? `${min} min  ago`
      : `${sec} sec  ago`;
  };

  const calenderDay = () => {
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
    return `${day}-${month}-${year} | ${hours}:${mins}:${sec}`;
  };

  const displayChange = e => {
    setDisplayToggle(!displayToggle);
  };
  return (
    <button
      className="button-style currentDate d-inline unselectable"
      onClick={displayChange}
    >
      {(displayToggle && timeDiff()) || calenderDay()}
    </button>
  );
};

export default TimeDisplay;
