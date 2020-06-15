import React, { useEffect, useRef } from "react";

const TextArea = ({ className, onChangeHandler, value, placeholder }) => {
  const textAreaRef = useRef(null);

  const autoExpand = field => {
    // Reset field height
    field.style.height = "inherit";

    // Get the computed styles for the element
    var computed = window.getComputedStyle(field);

    // Calculate the height
    var height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      (field.scrollHeight - 4) +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    field.style.height = height + "px";
  };

  const eventHandler = e => {
    // console.log(e.target);
    if (e.target.tagName.toLowerCase() !== "textarea") return;
    autoExpand(e.target);
  };

  useEffect(() => {
    autoExpand(textAreaRef.current);
  }, [value]);

  useEffect(() => {
    return () => {
      onChangeHandler("");
    };
  }, [onChangeHandler]);

  return (
    <div>
      <textarea
        ref={textAreaRef}
        className={`commentInput text-style ${className}`}
        onInput={eventHandler}
        onChange={e => onChangeHandler(e.target.value)}
        value={value}
        rows="1"
        type="text"
        name="commentInput"
        autoComplete="off"
        required
      />
      <label htmlFor="commentInput" className="label-name">
        <span className="content-name">{placeholder}</span>
      </label>
    </div>
  );
};

export default TextArea;
