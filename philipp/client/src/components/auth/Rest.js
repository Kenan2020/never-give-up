import React, { Fragment, useState } from 'react'
import { resetpassword } from '../../actions/auth'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Rest = ({ setAlert, resetpasswordState, resetpassword, ...props }) => {
    const [formData, setFormData] = useState({

        token: props.match.params.token,
        newPassword: '',
        confirmPassword: ''

    });
    const { token, newPassword, confirmPassword } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        resetpassword(token, newPassword)
        if (newPassword !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        }
    };

    if (resetpasswordState) {
        window.location.href = '/login'
    }


    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">Password:</label>
                    <input type="password" className="form-control" value={newPassword} onChange={onChange} placeholder="Enter password" name="newPassword" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={onChange} placeholder="Confirm password" name="confirmPassword" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    resetpasswordState: state.auth.resetpassword

});

export default connect(mapStateToProps, { resetpassword, setAlert })(Rest);
