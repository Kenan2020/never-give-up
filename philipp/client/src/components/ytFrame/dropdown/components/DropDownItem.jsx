import React, { useState, useEffect } from "react";

const DropDownItem = ({
  props: { title, handler, disabled },
  index,
  setActive,
  active,
}) => {
  const [style, setStyle] = useState(null);
  const onClickHanlder = e => {
    e.preventDefault();
    handler(title);
    setActive(index);
  };
  useEffect(() => {
    if (active === index) {
      setStyle({ backgroundColor: "#ddd" });
    }
    return () => {
      setStyle(null);
    };
  }, [active, index]);
  return (
    <input
      type="button"
      disabled={disabled ? true : false}
      style={style}
      className="drop-down-item unselectable d-block"
      onClick={onClickHanlder}
      value={title}
    />
  );
};

export default DropDownItem;
