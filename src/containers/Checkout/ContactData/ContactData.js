import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
        loading: false,
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
            orderDetails
        }
        axios.post('/orders.json', order)
            .then(response => {

                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {

                this.setState({ loading: false })
            });
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
        if (!this.state.loading) {
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

export default ContactData;