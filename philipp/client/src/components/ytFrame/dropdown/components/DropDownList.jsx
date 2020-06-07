import React from "react";
import DropDownItem from "./DropDownItem";
import PropTypes from "prop-types";

const DropDownList = ({ array, activeItem, setActive }) => {
  return (
    <div className="drop-down-list">
      {array.map((item, index) => (
        <DropDownItem
          key={index}
          props={item}
          index={index}
          setActive={setActive}
          active={activeItem}
        />
      ))}
    </div>
  );
};

export default DropDownList;

DropDownList.prototype = {
  array: PropTypes.array.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
};
