import React from "react";
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
      mass: 3,
      tension: 200,
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
