import React, { useEffect } from 'react'
import { fetchFacebookUser } from '../../actions/facebook'
import { connect } from 'react-redux'
const Facebook = ({ authReducer, fetchFacebookUser }) => {
    let output = null

    useEffect(() => {

        fetchFacebookUser();
    }, []);
    console.log(authReducer)

    if (authReducer !== null) {

        //output = <Redirect to='/' />;
        window.location.href = '/dashboard'
    }

    return (
        <div>
            <div>
                {output}
            Wait a moment
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({

    authReducer: state.authReducer

});

export default connect(mapStateToProps, { fetchFacebookUser })(Facebook);
