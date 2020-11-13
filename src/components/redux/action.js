export const TOGGLE_FAV = 'TOGGLE_FAV';

const toggleFav_action = id => {
  return { type: TOGGLE_FAV, favId: id };
};
