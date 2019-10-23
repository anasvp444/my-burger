import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

    state = {
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Anas',
                address: {
                    street: 'abc street',
                    zipCode: '45879',
                    Country: 'Malaysia'
                },
                email: '1test@rt.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log('send')
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false })
            });
    }


    render() {
        let form = <Spinner />
        if (!this.state.loading) {
            form = <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="zipCode" placeholder="Your Zip Code" />
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
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