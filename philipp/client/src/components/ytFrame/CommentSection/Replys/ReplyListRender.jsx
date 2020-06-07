import React, { useState, useEffect } from "react";
import { animated, useTrail } from "react-spring";
import Reply from "./Reply";

const ReplyListRender = ({ array }) => {
  const trail = useTrail(array.length, {
    from: {
      opacity: 0,
      x: 100,
    },
    to: {
      opacity: 1,
      x: 0,
    },
    config: {
      duration: 300,
      precision: 1,
      mass: 5,
      tension: 2000,
      friction: 200,
    },
  });

  return array
    ? trail.map((props, index) => (
        <animated.div
          key={index}
          style={{
            ...props,
            transform: props.x.interpolate(x => `translate3d(${x}px, 0, 0)`),
            zIndex: 2,
          }}
        >
          <Reply reply={array[index]} />
        </animated.div>
      ))
    : null;
};

export default ReplyListRender;
