import * as actionTypes from './actionTypes'
import axios from 'axios';


export const authStart = () => {
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
    localStorage.removeItem('idToken')
    localStorage.removeItem('expireDate')
    localStorage.removeItem('localId')
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
                const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('idToken', response.data.idToken)
                localStorage.setItem('expireDate', expireDate)
                localStorage.setItem('localId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })


    }
}

export const setAuthredirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken')
        if (idToken === null) {
            dispatch(logout());
        }
        else {
            const localId = localStorage.getItem('localId')
            const expireDate = localStorage.getItem('expireDate')
            const expiresIn = parseInt((new Date(expireDate).getTime() - new Date().getTime()) / 1000)

            if (expiresIn < 0) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(idToken, localId))
                dispatch(checkAuthTimeout(expiresIn))
            }

        }

    }
}