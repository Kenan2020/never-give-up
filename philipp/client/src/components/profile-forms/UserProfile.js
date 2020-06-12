import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAccount,
  createProfile,
  getCurrentProfile,
} from "../../actions/profile";
import Select from "react-select";

import { Buttonn } from "../reusable-button/Buttonn";
import countryList from "react-select-country-list";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormText,
} from "reactstrap";

// Check for token to keep user logged in

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  countryOfOrgigin: "",
  residentCity: "",
  educationBackground: "",
  skills: "",
  hobbyes: "",
  birthDate: "",
  to: "",
};
const UserProfile = ({
  auth: { user },
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  deleteAccount,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [options] = useState(countryList().getData());
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = {
        ...initialState,
      };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    firstName,
    lastName,
    email,
    gender,
    countryOfOrgigin,
    residentCity,
    educationBackground,
    skills,
    hobbyes,
    birthDate,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();

    let refined = {};
    for (let [key, value] of Object.entries(formData)) {
      if (value) refined = { ...refined, [key]: value.trim() };
    }

    createProfile(refined, history, profile, user ? true : false);
  };
  const changeHandler = value => {
    onChange({ target: { name: "countryOfOrgigin", value: value.label } });

    setValue(value);
  };
  console.log(birthDate);
  return (
    <Fragment>
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Hi {user.userName}</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col className="pr-md-1 " md="6">
                    <FormGroup>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Input
                        onChange={onChange}
                        value={email}
                        placeholder={user.email}
                        type="email"
                        name="email"
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <CardHeader>
                  <h5 className="title">Complete your Profile</h5>
                </CardHeader>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>First Name</label>
                      <Input
                        required
                        onChange={onChange}
                        type="text"
                        autoComplete="off"
                        name="firstName"
                        placeholder="First Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        required
                        onChange={onChange}
                        type="text"
                        autoComplete="off"
                        name="lastName"
                        placeholder="Last Name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <label>Gender *</label>
                    <br />
                    <FormGroup check>
                      <Input
                        type="radio"
                        onChange={onChange}
                        value="male"
                        name="gender"
                      />
                      Male
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        onChange={onChange}
                        value={"female"}
                        name="gender"
                      />
                      Female
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Date of Birth</label>
                      <Input
                        onChange={onChange}
                        type="date"
                        /*  value={from} */
                        name="birthDate"
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Country of Origin</label>
                      <Select
                        onChange={changeHandler}
                        value={value}
                        options={options}
                        placeholder="Select Country"
                        name="countryOfOrgigin"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Resident City</label>
                      <Input
                        onChange={onChange}
                        type="text"
                        name="residentCity"
                        value={residentCity}
                        autoComplete="off"
                        placeholder="Resident City"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Education Background</label>
                      <Input
                        onChange={onChange}
                        placeholder="Education Background"
                        type="text"
                        name="educationBackground"
                        value={educationBackground}
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <Label for="exampleText">Skills</Label>
                      <Input
                        onChange={onChange}
                        value={skills}
                        type="textarea"
                        name="skills"
                        id="exampleText"
                        placeholder="Skills Sections"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <Label for="exampleText">Hobby and intrest</Label>
                      <Input
                        onChange={onChange}
                        type="textarea"
                        value={hobbyes}
                        name="hobbyes"
                        placeholder="Section Hobbyes"
                        id="exampleText"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Buttonn className="btn-btn-dark" color="primary" type="submit">
                  Save
                </Buttonn>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <div className="text-success">
                  <h5 className="title">
                    {user.firstName} {user.lastName}
                  </h5>
                </div>
                <p className="description">Ceo/Co-Founder</p>
              </div>
              <div className="card-description">
                Wellcom in Deutschland Portal Her you Can Add an Change Your
                Profile Setting
              </div>
            </CardBody>
            <CardFooter>
              <div className="button-container">
                <Button className="btn-icon btn-round" color="facebook">
                  <i className="fab fa-facebook" />
                </Button>
                <Button className="btn-icon btn-round" color="twitter">
                  <i className="fab fa-twitter" />
                </Button>
                <Button className="btn-icon btn-round" color="google">
                  <i className="fab fa-google-plus" />
                </Button>
              </div>
            </CardFooter>
            <Button className="btn btn-default" onClick={() => deleteAccount()}>
              {" "}
              <i className="fas fa-user-minus" /> Delete My Account
            </Button>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  deleteAccount,
  createProfile,
  getCurrentProfile,
})(UserProfile);
