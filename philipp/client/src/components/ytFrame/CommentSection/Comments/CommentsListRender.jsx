import React from "react";
import { animated, useTrail } from "react-spring";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentsListRender = ({ array }) => {
  // const [items, setItems] = useState(null);

  /*  const transition2 = useSpring({
    from: {
      position: "relative",
      opacity: 0,
      left: 1200,
      right: -1200,
      width: 600,
      height: 300,
      backgroundColor: "red",
    },
    to: {
      position: "relative",
      opacity: 1,
      left: 0,
      right: 0,
      width: 600,
      height: 300,
      height: 300,
      backgroundColor: "blue",
    },
    config: { duration: 2000 },
  }); */

  /*  const props = useSpring({
    to: { height: height },
    from: { height: 0 },
    config: { duration: 2200, tension: 125, friction: 1, precision: 1 },
  }); */

  const trail = useTrail(array.length, {
    from: {
      opacity: 0,
      x: -100,
      h: 0,
    },
    to: {
      opacity: 1,
      x: 0,
      h: 1,
    },
    config: {
      mass: 2,
      tension: 200,
    },
  });
  /*  transform: props.h.interpolate(h => `scaleY(${h})`), */
  /*   */
  return array
    ? trail.map((props, index) => (
        <animated.div
          key={index}
          style={{
            ...props,
            transform: props.x.interpolate(x => `translate3d(0,${x}px , 0)`),
          }}
        >
          <Comment comment={array[index]} />
        </animated.div>
      ))
    : null;
};

CommentsListRender.propTypes = {
  show: PropTypes.bool,
  array: PropTypes.array,
};

export default CommentsListRender;

/*

const [ref, { height }] = useMeasure();
  console.log(height);
  const props = useSpring({
    height: show ? 2000 : 500,
    width: 700,
    backgroundColor: show ? "red" : "blue",
    overflow: "hidden",
    config: { duration: 5000 },
  });


 <animated.div ref={ref} style={props}>
    </animated.div>
    
*/
