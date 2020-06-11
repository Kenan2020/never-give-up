import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteAccount, updateUserProfile } from '../../actions/profile';
import { Buttonn } from '../reusable-button/Buttonn'
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
    Col
} from "reactstrap";


// Check for token to keep user logged in

const initialState = {
    userName: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
}
const UserProfile = ({ auth: { user },
    profile: { profile, loading },
    updateUserProfile
    , history
    , deleteAccount }) => {

    const [formData, setFormData] = useState(initialState);



    const {
        userName,
        name, lastName, email, password
    } = formData

    const onChange = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const onSubmit = e => {
        e.preventDefault();
        console.log(e);

        updateUserProfile(formData, history, profile ? true : false);
    };


    return (
        <Fragment>
            <div className="content">
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Edit User Profile</h5>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>User Name</label>
                                                <Input
                                                    disabled
                                                    onChange={onChange}
                                                    placeholder={user.userName}
                                                    type="text"
                                                    name='userName'
                                                    value={userName}
                                                    autoComplete='off'
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    onChange={onChange}
                                                    placeholder={user.name}
                                                    type="text"
                                                    name='name'
                                                    value={name}
                                                    autoComplete='off'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    value={lastName}
                                                    onChange={onChange}
                                                    placeholder={user.lastName}
                                                    type="text"
                                                    name='lastName'
                                                    autoComplete='off'
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Input
                                                    onChange={onChange}
                                                    value={email}
                                                    placeholder={user.email}
                                                    type="email"
                                                    name='email'
                                                    autoComplete='off'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="6">
                                            <FormGroup>
                                                <label>Password</label>
                                                <Input
                                                    onChange={onChange}
                                                    name='password'
                                                    placeholder="password"
                                                    type="password"
                                                    value={password}
                                                    autoComplete='off'
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
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

                                        <h5 className="title">{user.name} {user.lastName}</h5>
                                    </div>
                                    <p className="description">Ceo/Co-Founder</p>
                                </div>
                                <div className="card-description">
                                    Wellcom in Deutschland Portal
                                    Her you Can Add an Change Your Profile Setting
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
                            <Button className="btn btn-default" onClick={() => deleteAccount()}>    <i className="fas fa-user-minus" /> Delete My Account</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    updateUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { deleteAccount, updateUserProfile })(
    UserProfile
);

