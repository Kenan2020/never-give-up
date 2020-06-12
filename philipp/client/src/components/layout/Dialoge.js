import React, { useEffect } from "react";
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

import PropTypes from "prop-types";
import { removeDialog } from "./../../actions/dialog";
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

const CustomizedDialogs = ({ dialog, removeDialog }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    removeDialog();
    setOpen(false);
  };

  useEffect(() => {
    console.log(dialog);
    if (dialog) {
      setOpen(true);
    }
  }, [dialog]);

  if (!open) return null;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        /* aria-labelledby="simple-dialog-title" */
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {dialog.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{dialog.msg}</Typography>
        </DialogContent>
        <DialogActions>
          <div className="ml-0 mr-auto">
            <Button onClick={handleClose} color="primary" component="a">
              cancel
            </Button>
          </div>
          {dialog.buttons.map(({ title, eventHandler, href, color }, index) => (
            <Button
              component="button"
              key={index}
              onClick={eventHandler}
              color={color}
              href={href ? href : "#"}
            >
              {title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
};

CustomizedDialogs.propTypes = {
  dialog: PropTypes.array,
  removeDialog: PropTypes.func,
};

const mapStateToProps = state => ({
  dialog: state.dialog,
});

export default connect(mapStateToProps, { removeDialog })(CustomizedDialogs);
