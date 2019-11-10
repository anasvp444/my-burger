import axios from '../../axios-orders';
import * as actionTypes from './actionTypes'

export const addIngredients = (name) => {
    return (
        {
            type: actionTypes.ADD_INCREDIENTS,
            ingredientName: name
        }
    )
}
export const removeIngredients = (name) => {
    return (
        {
            type: actionTypes.REMOVE_INCREDIENTS,
            ingredientName: name
        }
    )
}

export const setIngredients = (ingredients) => {
    return (
        {
            type: actionTypes.SET_INCREDIENTS,
            ingredients: ingredients
        }
    )
}

export const fetchIngredientsFailed = () => {
    return (
        {
            type: actionTypes.FETCH_INCREDIENTS_FAILED
        }
    )
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-875c6.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}