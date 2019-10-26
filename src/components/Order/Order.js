import React from 'react';


import classes from './Order.css'

const order = (props) => {
    console.log(props.ingredients)

    const incredients = []
    for (let incredientName in props.ingredients) {
        incredients.push({
            name: incredientName,
            amount: props.ingredients[incredientName]
        })

    }
    const ingredientOutput = incredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingerdients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default order;