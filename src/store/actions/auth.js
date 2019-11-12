import * as actionTypes from './actionTypes'
import axios from 'axios';


export const authStart = () => {
    console.log('authS')
    return (
        {
            type: actionTypes.AUTH_START,
        }
    )
}

export const authSuccess = (idToken, localId) => {
    return (
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: idToken,
            localId: localId
        }
    )
}
export const authFail = (error) => {
    return (
        {
            type: actionTypes.AUTH_FAIL,
            error: error
        }
    )
}
export const logout = () => {
    return (
        {
            type: actionTypes.AUTH_LOGOUT,
        }
    )
}

const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expireTime * 1000)
    }

}


export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhWvXAuHI6REpK1APOefAaPNnDSEImBzI'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhWvXAuHI6REpK1APOefAaPNnDSEImBzI'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response.data.error))
            })


    }
}