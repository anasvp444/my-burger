import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4
    }

    addIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })
    }

    removeIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount - 1;
        if (updatedCount < 0) {
            updatedCount = 0
        }

        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice - priceReduction;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    incredientAdded={this.addIngerdientHandler}
                    incredientRemoved={this.removeIngerdientHandler}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder;