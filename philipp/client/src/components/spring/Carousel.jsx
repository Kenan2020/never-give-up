import React, { useState } from "react";
import { animated } from "react-spring";
import { Transition, Spring } from "react-spring/renderprops";

const CarouselContent = ({ children, activeIndex, prevIndex }) => (
  <Transition
    native
    keys={activeIndex}
    initial={{ x: 0 }}
    from={{
      opacity: 0,
      x: prevIndex < activeIndex ? 200 : -200,
    }}
    enter={{ opacity: 1, x: 0 }}
    leave={{
      opacity: 0,
      x: prevIndex < activeIndex ? -100 : 100,
      position: "absolute",
      pointerEvents: "none",
    }}
    delay={1}
  >
    {console.log(children)}
    {({ x, ...rest }) => (
      <animated.div
        style={{
          transform: x.interpolate(val => `translate3d(${val}px,0,0)`),
          ...rest,
        }}
      >
        {children[activeIndex]}
      </animated.div>
    )}
  </Transition>
);

const HeightTransition = ({ children }) => (
  <Spring native force from={{ height: "auto" }} to={{ height: "auto" }}>
    {styles => <animated.div style={styles}>{children}</animated.div>}
  </Spring>
);

///////////////// Carousel ////////////////

const Carousel = props => {
  /*  const getItemProps = (props = {}) => ({
    ...props,
    select: select,
  }); */

  return (
    <HeightTransition>
      <CarouselContent
        activeIndex={props.activeIndex}
        prevIndex={props.prevIndex}
      >
        {/*    {props.children({
          getItemProps: getItemProps,
        })} */}
      </CarouselContent>
    </HeightTransition>
  );
};

export default Carousel;

/* const Carousel = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  const select = index => {
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  const getItemProps = (props = {}) => ({
    ...props,
    select: select,
  });

  return (
    <HeightTransition>
      <CarouselContent activeIndex={activeIndex} prevIndex={prevIndex}>
        {props.children({
          getItemProps: getItemProps,
        })}
      </CarouselContent>
    </HeightTransition>
  );
};

export default Carousel; */

/* class Carousel extends React.Component {
  state = {
    activeIndex: 0,
    prevIndex: -1,
  };

  select = index => {
    this.setState(prevState => ({
      prevIndex: prevState.activeIndex,
      activeIndex: index,
    }));
  };

  getItemProps = (props = {}) => ({
    ...props,
    select: this.select,
  });

  render() {
    return (
      <HeightTransition>
        <CarouselContent
          activeIndex={this.state.activeIndex}
          prevIndex={this.state.prevIndex}
        >
          {this.props.children({
            getItemProps: this.getItemProps,
          })}
        </CarouselContent>
      </HeightTransition>
    );
  }
} */
