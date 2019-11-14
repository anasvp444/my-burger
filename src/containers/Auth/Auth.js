import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import classes from './Auth.css'
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: 'abc@er.com',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touch: false
            },
            password: {
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '123456',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touch: false
            }
        },
        isSignUp: true
    }
    checkValidation(value, rules) {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid

    }

    inputChangeHandler = (event, id) => {
        const updatedControls = { ...this.state.controls }
        const updatedControlsElemnt = { ...updatedControls[id] }
        updatedControlsElemnt.value = event.target.value
        updatedControlsElemnt.valid = this.checkValidation(updatedControlsElemnt.value,
            updatedControlsElemnt.validation)
        updatedControlsElemnt.touch = true
        updatedControls[id] = updatedControlsElemnt

        let formIsValid = true

        for (let inputid in updatedControls) {
            formIsValid = updatedControls[inputid].valid && formIsValid
        }

        this.setState({ controls: updatedControls, formIsValid })
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value, this.state.isSignUp)
    }

    switchSignMethod = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    componentDidMount() {
        if (this.props.burgerBuilder && this.props.authRedirectPath !== '/') {
            this.props.onSetRedirectPath();
        }
    }


    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =
            formElementArray.map(formElement => {
                return (
                    <Input key={formElement.id} elementtype={formElement.config.elementtype}
                        elementconfig={formElement.config.elementconfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        touch={formElement.config.touch} />
                )
            })
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null
        if (this.props.isAuth) {

            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {authRedirect}
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? 'SUBMIT' : 'SIGN IN'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchSignMethod}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken !== null,
        buliding: state.burgerBuilder.buliding,
        authRedirectPath: state.auth.authRedirectPath

    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthredirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);