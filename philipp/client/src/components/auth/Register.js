import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Buttonn } from '../reusable-button/Buttonn';
import Input from '../reusable-input/Input'

const Register = ({
    setAlert,
    register,
    message,
    authReducer,
    activateLink
  }) => {
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { userName, name, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ userName, name, lastName, email, password });
    }
  };
  if (authReducer) {
    return <Redirect to="/dashboard" />;

  }

  if (activateLink) {
    setAlert('We send you email please Activate your account')
  }

  return (
    <Fragment>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
            <h1 className=" text-center mt-3 "><i className="fas fa-user  mt-3" /> Sign Up</h1>
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
                <div className="col-12 col-xs-12 col-sm-10 col-md-8 col-lg-8">
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
                <div className="mb-3">
                  <Link to="/login">
                    <Buttonn
                      onClick={() => {
                        console.log("you clicked on me");
                      }}
                      type="button"
                      buttonStyle="btn-primary-outlinee"
                      buttonSize="btn-large"
                    >
                      <i className="fa fa-sign-in"></i> Already have an account signin{" "}
                    </Buttonn>
                  </Link>
                </div>
              </form>
              <Link to='/forgetpassword' className="btn btn-danger">
                forget Password
            </Link>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="col-md-6 offset-md-3  bg-light">
        <h1 className=" text-center mt-3 "><i className="fas fa-user  mt-3" /> Sign Up</h1>
        <div className="">
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
            <i className="fa fa-google fa-2x"></i>
            <span className="hidden-xs"></span>
          </a>
        </div>
        <hr />
        <form onSubmit={onSubmit} className="mt-5">
          <div className="form-group">
            <label htmlFor="userName">User name:</label>
            <input type="text" className="form-control" value={} onChange={onChange} placeholder="Enter user name" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First name:</label>
            <input type="text" className="form-control" value={name} onChange={onChange} placeholder="Enter first name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Last name:</label>
            <input type="text" className="form-control" value={lastName} onChange={onChange} placeholder="Enter last name" name="lastname" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" value={email} onChange={onChange} placeholder="Enter email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" onChange={onChange} value={password} className="form-control" placeholder="Enter password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Cofire Password:</label>
            <input type="password " onChange={onChange} value={password2} className="form-control" placeholder="Enter password" name="password2" />
          </div>

          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <div className="mb-5">
            <Buttonn
              type="submit"
              buttonStyle="btn-primary-outlinee"
              buttonSize="btn-large"
              value="Register"
            >
              SignIn{" "}
            </Buttonn>
            <br />
            <br />
            <Link to="/login">
              <Buttonn
                type="button"
                buttonStyle="btn-primary-outlinee"
                buttonSize="btn-large"
              >
                Already have account signin
              </Buttonn>
            </Link>
            <Link to='/forgetpassword'>
              forget Password
            </Link>
          </div>
        </form>
      </div>
 */}

    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  message: state.auth.message,
  authReducer: state.authReducer

});

export default connect(mapStateToProps, { setAlert, register })(Register);
