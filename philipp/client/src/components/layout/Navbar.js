import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Dropdown } from "react-bootstrap";
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const style = {
    maxWidth: "4vw",
    maxHeight: "4vh",
    borderRadius: "50%",
    marginRight: "5px",
  };

  const authLinks = (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {user && user.picture ? (
          <img src={user.picture} style={style} alt="user" />
        ) : (
          <i className="fas fa-user" />
        )}{" "}
        {user && user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/userprofile">
          <i className="fas fa-user" /> UserProfile
        </Dropdown.Item>
        <Dropdown.Item href="/create-profile">
          <i className="fas fa-user" /> Edit Profile
        </Dropdown.Item>
        {/* <Dropdown.Item href="/add-experience"><i className='fab fa-black-tie text-primary' /> Add Experience</Dropdown.Item>
        <Dropdown.Item href="/add-education"> <i className='fas fa-graduation-cap text-primary' /> Add Education</Dropdown.Item> */}
        <Dropdown.Item onClick={logout} href="#/action-2">
          {" "}
          <i className="fas fa-sign-out-alt"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const guestLinks = (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link" to="/display">
          Display <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/login">
          Login <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/register">
          Register <span className="sr-only">(current)</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          RE7wac
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <ul>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
