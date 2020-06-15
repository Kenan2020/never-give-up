import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import PropTypes from "prop-types";
import { Buttonn } from "./../../reusable-button/Buttonn";
import Input from "./../../reusable-input/Input";

const Register = ({
  setAlert,
  register,
  message,
  authReducer,
  activateLink,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { userName, name, lastName, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ userName, name, lastName, email, password });
    }
  };
  if (authReducer) {
    return <Redirect to="/dashboard" />;
  }

  if (activateLink) {
    setAlert("We send you email please Activate your account");
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col">
          <h1 className=" text-center ">
            <i className="fas fa-user  mt-3" /> Sign Up
          </h1>
          <div className="kpx_login mt-2 ">
            <div className=" kpx_socialButtons">
              <a
                href="/auth/facebook"
                className="btn btn-lg  d-block kpx_btn-facebook"
                data-toggle="tooltip"
                data-placement="top"
                title="Facebook"
              >
                <i className="fa fa-facebook fa-2x"></i>
                <span className="hidden-xs"></span>
              </a>
              <a
                href="/auth/google"
                className="btn btn-lg mt-3  d-block kpx_btn-google-plus"
                data-toggle="tooltip"
                data-placement="top"
                title="Google Plus"
              >
                <i className="fa fa-google-plus fa-2x"></i>
                <span className="hidden-xs"></span>
              </a>
            </div>

            <br />
            <div className="row justify-content-center kpx_row-sm-offset-3 kpx_loginOr">
              <div className="col">
                <hr className="kpx_hrOr" />
                <span className="kpx_spanOr">or</span>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <Input
                type="text"
                inputSize="large"
                placeholder="Write your user name"
                label="User name"
                onChange={onChange}
                value={userName}
                name="userName"
              />
              <Input
                type="text"
                inputSize="large"
                placeholder="Write your first name"
                label="First name"
                onChange={onChange}
                value={name}
                name="name"
              />
              <Input
                type="text"
                inputSize="large"
                placeholder="Write your last name"
                label="Last name"
                onChange={onChange}
                value={lastName}
                name="lastName"
              />
              <Input
                type="email"
                inputSize="large"
                placeholder="Write your email"
                label="Email"
                onChange={onChange}
                value={email}
                name="email"
              />
              <Input
                attribute={{ minLength: 6 }}
                type="password"
                inputSize="large"
                placeholder="Write your Password"
                label="Password"
                onChange={onChange}
                value={password}
                name="password"
              />
              <Input
                attribute={{ minLength: 6 }}
                type="password"
                inputSize="large"
                placeholder="Confirm your Password"
                label="Confirm Password"
                onChange={onChange}
                value={password2}
                name="password2"
              />
              <div className="row justify-content-center kpx_row-sm-offset-3 kpx_loginOr">
                <div className="col-12 col-xs-12 col-sm-10 col-md-8 col-lg-8">
                  <hr className="kpx_hrOr" />
                  <span className="kpx_spanOr">or</span>
                </div>
              </div>
              <div className="mb-3">
                <Buttonn
                  type="submit"
                  buttonStyle="btn-primary-outlinee"
                  buttonSize="btn-large"
                  value="Login"
                >
                  <i className="fa fa-sign-in"></i> Sign Up{" "}
                </Buttonn>
              </div>
              <div className="mb-3"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  message: state.auth.message,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
