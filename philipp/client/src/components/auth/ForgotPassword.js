
import React, { Fragment, useState } from 'react'
import { forgotpassword } from '../../actions/auth'
import { connect } from 'react-redux';

const ForgotPassword = ({ forgotpassword, forgotpasswordState }) => {
    const [formData, setFormData] = useState({
        email: '',
    });

    let message = null;

    const { email } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        forgotpassword(email)
    };

    if (forgotpasswordState) {
        message = <h3>We have sent you the link</h3>
    }

    console.log(forgotpasswordState)

    return (
        <Fragment>
            {message}
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" value={email} onChange={onChange} placeholder="Enter email" name="email" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    forgotpasswordState: state.auth.forgotpassword

});

export default connect(mapStateToProps, { forgotpassword })(ForgotPassword);
