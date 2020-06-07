import React, { useEffect } from 'react'
import { fetchUser } from '../../actions/google'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Google = ({ authReducer, fetchUser }) => {

    let output = null

    useEffect(() => {

        fetchUser();
    }, []);
    console.log(authReducer)

    if (authReducer !== null) {

        //output = <Redirect to='/' />;
        window.location.href = '/dashboard'
    }

    return (
        <div>
            {output}
            Wait a moment
        </div>
    )
}




// Register.propTypes = {
//     setAlert: PropTypes.func.isRequired,
//     register: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool
// };

const mapStateToProps = (state) => ({

    authReducer: state.authReducer

});

export default connect(mapStateToProps, { fetchUser })(Google);
