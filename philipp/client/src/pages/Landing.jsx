import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import YTFrameCollection from "./YTFrameCollection";
import YTFrame from "./../components/ytFrame/YTFrame";

import Transition from "./../components/spring/Transition";
import { useTransition } from "react-spring";

const Landing = () => {
  let [index, setIndex] = React.useState(0);
  const changeHandler = () => {
    setIndex(++index);
  };

  const transitions = useTransition(index, p => p, {
    from: {
      opacity: 0,
      transform: "translate3d(100%,0,0)",
      position: "absolute",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
      position: "block",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(-100%,0,0)",
      position: "absolute",
    },
    config: { duration: 2500 },
  });
  return (
    <div className="container">
      <Router>
        <div className="row justify-content-center mt-5">
          <ul>
            <li className=" nav-item mr-auto mt-5">
              <Link to="/YTFrame1">YTFrame1</Link>
            </li>
            <li className=" nav-item mr-auto mt-5">
              <Link to="/YTFrame2">YTFrame2</Link>
            </li>
            <li className=" nav-item mr-auto mt-5">
              <Link to="/YTFrame3">YTFrame3</Link>
            </li>
            <li className=" nav-item mr-auto mt-5">
              <Link to="/YTFrame4">YTFrame4</Link>
            </li>
            <li className=" nav-item mr-auto mt-5">
              <Link to="/YTFrameCollection">YTFrame Collection</Link>
            </li>
            <li className=" nav-item mr-auto mt-5">
              <button onClick={changeHandler}>click</button>
            </li>
            <li className=" nav-item mr-auto mt-5">
              {/*   <Transition index={index} transitions={transitions}>
                <div>fuu</div>
                <div>baa</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </Transition> */}
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path="/YTFrame1"
            render={() => <YTFrame src={"UVT6_xq930I"} />}
          />
          <Route
            path="/YTFrame2"
            render={() => (
              <div className="container">
                <YTFrame src={"5pAsss_nTlk"} />
              </div>
            )}
          />
          <Route
            path="/YTFrame3"
            render={() => (
              <div className="container">
                <YTFrame src={"Efskcq_mqv4"} />
              </div>
            )}
          />
          <Route
            path="/YTFrame4"
            render={() => (
              <div className="container">
                <YTFrame src={"Zz6eOVaaelI"} />
              </div>
            )}
          />
          <Route path="/YTFrameCollection" component={YTFrameCollection} />
        </Switch>
      </Router>
    </div>
  );
};

export default Landing;
