import React, { useState, useEffect, useRef } from "react";
import DropDownList from "./components/DropDownList";
//import onClickOutside from "react-onclickoutside";
import "./DropDown.css";
//props = array of objects // each object is a listItem // each listItem has a title and a onClickHandler
function DropDown({ className, style, array, title, activeDefaultItem }) {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(activeDefaultItem);
  const onClickHandler = e => {
    e.preventDefault();
    setShow(true);
  };

  useOnClickOutside(ref, () => {
    setShow(false);
  });

  return (
    <div className={className}>
      <button
        style={style}
        className="unselectable drop-down-button"
        onClick={onClickHandler}
      >
        {title}
      </button>
      {show && (
        <div ref={ref}>
          <DropDownList
            array={array}
            activeItem={activeItem}
            setActive={setActiveItem}
          />
        </div>
      )}
    </div>
  );
}

// higher order component // wrapping component
export default DropDown;
// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
