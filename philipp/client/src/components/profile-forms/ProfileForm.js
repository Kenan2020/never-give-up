// import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createProfile, getCurrentProfile } from '../../actions/profile';
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   // CardFooter,
//   // CardText,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col
// } from "reactstrap";
// const initialState = {
//   company: '',
//   website: '',
//   location: '',
//   status: '',
//   skills: '',
//   githubusername: '',
//   bio: '',
//   twitter: '',
//   facebook: '',
//   linkedin: '',
//   youtube: '',
//   instagram: ''
// };

// const ProfileForm = ({
//   profile: { profile, loading },
//   createProfile,
//   getCurrentProfile,
//   history
// }) => {
//   const [formData, setFormData] = useState(initialState);

//   const [displaySocialInputs, toggleSocialInputs] = useState(false);

//   useEffect(() => {
//     if (!profile) getCurrentProfile();
//     if (!loading && profile) {
//       const profileData = { ...initialState };
//       for (const key in profile) {
//         if (key in profileData) profileData[key] = profile[key];
//       }
//       for (const key in profile.social) {
//         if (key in profileData) profileData[key] = profile.social[key];
//       }
//       if (Array.isArray(profileData.skills))
//         profileData.skills = profileData.skills.join(', ');
//       setFormData(profileData);
//     }
//   }, [loading, getCurrentProfile, profile]);

//   const {
//     company,
//     website,
//     location,
//     status,
//     skills,
//     githubusername,
//     bio,
//     twitter,
//     facebook,
//     linkedin,
//     youtube,
//     instagram
//   } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = e => {
//     e.preventDefault();
//     createProfile(formData, history, profile ? true : false);
//   };

//   return (
//     <Fragment>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <h1 className="large text-primary">Edit Your Profile</h1>
//                 <p className="lead">
//                   <i className="fas fa-user" /> Add some changes to your profile
//                 </p>
//               </CardHeader>
//               <CardBody>
//                 <Form onSubmit={onSubmit}>
//                   <Row>
//                     <Col className="pr-md-1" md="12">
//                       <small>* = required field</small>
//                     </Col>
//                     <Col className="pr-md-1" md="12">
//                       <FormGroup>
//                         <select name="status" value={status} onChange={onChange} >
//                           <option>* Select Professional Status</option>
//                           <option value="Developer">Developer</option>
//                           <option value="Junior Developer">Junior Developer</option>
//                           <option value="Senior Developer">Senior Developer</option>
//                           <option value="Manager">Manager</option>
//                           <option value="Student or Learning">Student or Learning</option>
//                           <option value="Instructor">Instructor or Teacher</option>
//                           <option value="Intern">Intern</option>
//                           <option value="Other">Other</option>
//                         </select>
//                         <small className="form-text">
//                           Give us an idea of where you are at in your career
//                         </small>
//                       </FormGroup>
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           placeholder="Company"
//                           name="company"
//                           value={company}
//                           onChange={onChange} />
//                         <small className="form-text">
//                           Could be your own company or one you work for
//                         </small>
//                       </FormGroup>
//                       <FormGroup >
//                         <Input className="form-control input-lg"
//                           type="text"
//                           placeholder="Website"
//                           name="website"
//                           value={website}
//                           onChange={onChange}
//                         />
//                         <small className="form-text">
//                           Could be your own or a company website
//                         </small>
//                       </FormGroup>
//                       <FormGroup >
//                         <Input
//                           type="text"
//                           placeholder="Location"
//                           name="location"
//                           value={location}
//                           onChange={onChange}
//                         />
//                         <small className="form-text">
//                           City & state suggested (eg. Boston, MA)
//                         </small>
//                       </FormGroup>

//                       <FormGroup >
//                         <Input
//                           type="text"
//                           placeholder="* Skills"
//                           name="skills"
//                           value={skills}
//                           onChange={onChange}
//                         />
//                         <small className="form-text">
//                           Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
//                         </small>
//                       </FormGroup>
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           placeholder="Github Username"
//                           name="githubusername"
//                           value={githubusername}
//                           onChange={onChange}
//                         />
//                         <small className="form-text">
//                           If you want your latest repos and a Github link, include your
//                           username
//                         </small>
//                       </FormGroup>
//                       <FormGroup>

//                         <Input
//                           cols="80"

//                           rows="4"
//                           type="textarea"
//                           placeholder="A short bio of yourself"
//                           name="bio"
//                           value={bio}
//                           onChange={onChange}
//                         />
//                         <small className="form-text">Tell us a little about yourself</small>
//                       </FormGroup>
//                       <div>
//                         <Button
//                           onClick={() => toggleSocialInputs(!displaySocialInputs)}
//                           type="Button"
//                           className="btn btn-light"
//                         >
//                           Add Social Network Links
//                         </Button>
//                         <span>Optional</span>
//                       </div>
//                       {displaySocialInputs && (
//                         <Fragment>
//                           <FormGroup className=" social-input">
//                             <i className="fab fa-twitter fa-2x" />
//                             <Input
//                               type="text"
//                               placeholder="Twitter URL"
//                               name="twitter"
//                               value={twitter}
//                               onChange={onChange}
//                             />
//                           </FormGroup>

//                           <FormGroup className=" social-input">
//                             <i className="fab fa-facebook fa-2x" />
//                             <Input
//                               type="text"
//                               placeholder="Facebook URL"
//                               name="facebook"
//                               value={facebook}
//                               onChange={onChange}
//                             />
//                           </FormGroup>

//                           <FormGroup className="social-input">
//                             <i className="fab fa-youtube fa-2x" />
//                             <Input
//                               type="text"
//                               placeholder="YouTube URL"
//                               name="youtube"
//                               value={youtube}
//                               onChange={onChange}
//                             />
//                           </FormGroup>

//                           <FormGroup className="social-input">
//                             <i className="fab fa-linkedin fa-2x" />
//                             <Input
//                               type="text"
//                               placeholder="Linkedin URL"
//                               name="linkedin"
//                               value={linkedin}
//                               onChange={onChange}
//                             />
//                           </FormGroup>

//                           <FormGroup className="social-input">
//                             <i className="fab fa-instagram fa-2x" />
//                             <Input
//                               type="text"
//                               placeholder="Instagram URL"
//                               name="instagram"
//                               value={instagram}
//                               onChange={onChange}
//                             />
//                           </FormGroup>
//                         </Fragment>
//                       )}
//                       <Input type="submit" className="btn btn-primary my-1" />
//                       <Link className="btn btn-light my-1" to="/dashboard">
//                         Go Back
//                      </Link>
//                     </Col>
//                   </Row>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </Fragment>
//   );
// };

// ProfileForm.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });

// export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
//   ProfileForm
// );
