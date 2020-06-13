import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

import Login from "./Login";
import Register from "./Register";
import { Transition as SpringTransition } from "./../../spring/Transition";
import { useTransition } from "react-spring";
//import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PropTypes from "prop-types";
import { removeDialog } from "./../../../actions/dialog";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

////////////// Tabs ////////////

function MuiTabs(props) {
  const { value, handleChange } = props;
  return (
    <Tabs
      centered
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Login" />
      <Tab label="Register" />
    </Tabs>
  );
}

/////////////////////////////////////  SignInUpModal  ////////////////////////////////////////////////////////////

const SignInUpModal = ({ dialog, removeDialog, isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIndex(newValue);
  };

  const handleClose = () => {
    removeDialog();
    setOpen(false);
  };

  useEffect(() => {
    if (dialog) {
      setOpen(true);
    }
  }, [dialog]);

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
    }
  }, [isAuthenticated]);

  let [index, setIndex] = useState(0);
  const changeHandler = () => {
    setIndex(++index);
  };
  const transitions = useTransition(index, p => p, {
    from: {
      opacity: 0,
      transform: "translate3d(100%,0,0)",
      /*   marginLeft: -2000,
      marginRight: 2000, */
    },
    to: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
      /*   marginLeft: 0,
      marginRight: 0, */
    },
    leave: {
      opacity: 0,
      transform: "translate3d(-100%,0,0)",
      /*  marginLeft: -2000,
      marginRight: 2000, */
    },
    config: { duration: 150 },
  });
  console.log(value);

  if (!open) return null;

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {dialog.title}
      </DialogTitle>

      <DialogContent dividers>
        <MuiTabs value={value} handleChange={handleChange} />
        {console.log(value)}
        <SpringTransition index={index} transitions={transitions}>
          <Login />
          <Register />
        </SpringTransition>
        {/*  <div className="modal-body">
          {(value === 0 && <Login />) || <Register />}
        </div>  */}
      </DialogContent>
    </Dialog>
  );
};

SignInUpModal.propTypes = {
  dialog: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  dialog: state.dialog,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { removeDialog })(SignInUpModal);
/*   {(value === 0 && (
              <Login />
          )) || (
                <Register />
          )} */
