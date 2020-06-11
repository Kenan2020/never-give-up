/* import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { removeDialog } from "../../../actions/dialog";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const SignInUpModal = ({ dialog, removeDialog }) => {
  const [show, setShow] = useState(false);

  const showRegister = () => {
    setShow(true);
  };
  const showLogin = () => {
    setShow(false);
  };
  console.log(dialog);
  return dialog ? (
    <div className="modal fade in">
      <div className="modal-backdrop fade in"></div>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={removeDialog}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <h4 className="modal-title" id="myModalLabel">
            Login/Registration -
          </h4>
          <button onClick={showRegister}>Login</button>
          <button onClick={showLogin}>Login</button>
        </div>
        <div className="modal-body">{show ? <Login /> : <Register />}</div>
      </div>
    </div>
  ) : null;
};

SignInUpModal.propTypes = {
  dialog: PropTypes.object,
  removeDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dialog: state.dialog,
});

export default connect(mapStateToProps, { removeDialog })(SignInUpModal);
 */
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";

import Login from "./Login";
import Register from "./Register";

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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialogs = ({ dialog, removeDialog, isAuthenticated }) => {
  const [open, setOpen] = React.useState(false);

  const [show, setShow] = useState(true);

  const showRegister = e => {
    setShow(true);
  };
  const showLogin = e => {
    setShow(false);
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

  if (!open) return null;

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      /* aria-labelledby="simple-dialog-title" */
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {dialog.title}
      </DialogTitle>
      <DialogContent dividers>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${show ? "active" : ""} `}
              onClick={showRegister}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${!show ? "active" : ""} `}
              onClick={showLogin}
            >
              Register
            </button>
          </li>
        </ul>

        <div className="modal-body">{show ? <Login /> : <Register />}</div>
      </DialogContent>
    </Dialog>
  );
};

CustomizedDialogs.propTypes = {
  dialog: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  dialog: state.dialog,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { removeDialog })(CustomizedDialogs);
