import React, { useState } from 'react'
import { connect } from 'react-redux';
import { activateAcount } from '../../actions/auth'
import {Redirect} from 'react-router-dom'

const Activate = ({
        activateLink,
        activateAcount,
        ...props
    }) => {
    const [formData, setFormData] = useState({

        token: props.match.params.token,
       
    });
    const { token } = formData;


    const onSubmit = async (e) => {
        e.preventDefault();
        activateAcount(token);
        setFormData({ ...formData})
    };
    if (activateLink) {
        return <Redirect to = "/dashboard" / > ;
    }

    return (
        <div className="text-center">
            <h1 className="p-5">Hey, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={onSubmit}>
                Activate Account
            </button>
        </div>
    )
}



const mapStateToProps = (state) => ({
    activateLink: state.auth.activateLink

});

export default connect(mapStateToProps, { activateAcount })(Activate);

