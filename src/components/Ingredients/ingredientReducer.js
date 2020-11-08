import * as actionTypes from './actionTypes';

export const ingredientReducer = (currentState, action) => {
  switch (action.type) {
    case actionTypes.SET: {
      return action.ingredients;
    }
    case actionTypes.ADD: {
      return [...currentState, action.ingredient];
    }
    case actionTypes.REMOVE: {
      return [...currentState.filter(i => i.id !== action.removedId)];
    }
    default: {
      console.log('Should not get there');
    }
  }
};
