import React from "react";
import { Spinner as BootSpinner } from "react-bootstrap";

const Spinner = ({
  show,
  animation = "border",
  role = "status",
  size,
  className,
  style,
}) => {
  return (
    show && (
      <div className={className}>
        <BootSpinner
          style={style}
          animation={animation}
          role={role}
          size={size}
        />
      </div>
    )
  );
};

export default Spinner;
