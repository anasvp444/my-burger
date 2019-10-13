import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
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
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        let updatedCount = oldCount - 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        console.log("continue")
    }
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        puchaseCancelled={this.purchaseCancelHandler}
                        puchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    incredientAdded={this.addIngerdientHandler}
                    incredientRemoved={this.removeIngerdientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder;