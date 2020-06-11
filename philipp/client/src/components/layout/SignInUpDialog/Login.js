import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";
import "./../../auth/styls/login.css";

import Input from "./../../reusable-input/Input";
import { Buttonn } from "./../../reusable-button/Buttonn";
// import { Buttonn } from '../../reusable-button/Buttonn'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  /*   if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } */

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col">
          <h1 className=" text-center mt-5 ">
            <i className="fas fa-user  mt-5" /> Sign in
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
          </div>
          <form onSubmit={onSubmit}>
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
              attribute={{ maxLength: 8 }}
              type="password"
              inputSize="large"
              placeholder="Write your Password"
              label="Password"
              onChange={onChange}
              value={password}
              name="password"
            />
            <hr />
            <div className="mb-3">
              <Buttonn
                type="submit"
                buttonStyle="btn-primary-outlinee"
                buttonSize="btn-large"
                value="Login"
              >
                <i className="fa fa-sign-in"></i> Sign In{" "}
              </Buttonn>
            </div>
            <div className="mb-3"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
