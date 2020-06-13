import React from "react";
import { animated } from "react-spring";
import "./springStyle.css";
/* 
const pages = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      C
    </animated.div>
  ),
]; 

function App() {
  const [index, set] = useState(0);
  const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return (
    <div className="simple-trans-main" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page key={key} style={props} />;
      })}
    </div>
  );
}*/

export const Transition = ({ children, index, transitions }) => {
  index = index >= children.length - 1 ? children.length - 1 : index;
  console.log(index);
  const pages = children.map(child => ({ style }) => (
    <animated.div style={style}>{child}</animated.div>
  ));
  console.log(pages, transitions);
  return (
    <div className="transition-container">
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        console.log(Page);
        return <Page key={key} style={props} />;
      })}
    </div>
  );
};
export default Transition;
