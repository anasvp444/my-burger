import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {

                let fetchedOrders = []

                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key], id: key
                    })
                }

                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {

        let order = null
        if (!this.state.loading) {
            order = (this.state.orders.map(order => {
                return (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)
            }))
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

export default WithErrorHandler(Orders, axios);