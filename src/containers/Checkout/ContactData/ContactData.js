import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../../store/actions/index';


class ContactData extends Component {

    state = {
        formIsValid: false,
        orderForm: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            zipCode: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7
                },
                valid: false,
                touch: false
            },
            Country: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementconfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderDetails = {}
        for (let orderFormid in this.state.orderForm) {
            orderDetails[orderFormid] = this.state.orderForm[orderFormid].value
        }
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDetails,
            userId: this.props.userId
        }
        console.log(this.props.token)
        this.props.onOrderBurger(order, this.props.token);

    }

    checkValidation(value, rules) {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid

    }

    inputChangeHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedOrderFormElemnt = { ...updatedOrderForm[id] }
        updatedOrderFormElemnt.value = event.target.value
        updatedOrderFormElemnt.valid = this.checkValidation(updatedOrderFormElemnt.value,
            updatedOrderFormElemnt.validation)
        updatedOrderFormElemnt.touch = true
        updatedOrderForm[id] = updatedOrderFormElemnt

        let formIsValid = true

        for (let inputid in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputid].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid })
    }

    render() {

        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = <Spinner />
        if (!this.props.loading) {
            form = <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => {
                    return (
                        <Input key={formElement.id} elementtype={formElement.config.elementtype}
                            elementconfig={formElement.config.elementconfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            touch={formElement.config.touch} />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.localId
    };
};



const mapDispatchToProps = dispatch => {

    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));