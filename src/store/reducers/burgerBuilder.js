import * as actionTypes from '../actions/actionTypes'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

const reducers = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INCREDIENTS:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INCREDIENTS:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INCREDIENTS:

            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                building: false

            };
        case actionTypes.FETCH_INCREDIENTS_FAILED:

            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducers;