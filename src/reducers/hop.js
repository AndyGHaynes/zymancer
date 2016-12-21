import RecipeActions from '../constants/RecipeActionTypes';
import hopAddition from './hopAddition';
import helpers from '../utils/helpers';
import round from 'lodash/round';

function createHop(hop, boilMinutes) {
  const alphaRange = hop.alphaRange || helpers.extractRange(hop.alpha);
  const betaRange = hop.betaRange || helpers.extractRange(hop.beta);

  return {
    id: hop.id,
    name: hop.name,
    alpha: isNaN(hop.alpha) ? round(alphaRange.avg, 1) : hop.alpha,
    beta: isNaN(hop.beta) ? round(betaRange.avg, 1) : hop.beta,
    additions: (hop.additions || []).map(a => hopAddition.create(a, hop, boilMinutes)),
    categories: typeof hop.categories === 'string' ? hop.categories.split(',') : hop.categories,
    alphaRange,
    betaRange
  };
}

const hop = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddHop:
      return createHop(action.hop, action.boilMinutes);
    case RecipeActions.SetHopAlpha:
      return Object.assign({}, state, { alpha: action.alpha });
    case RecipeActions.SetHopBeta:
      return Object.assign({}, state, { beta: action.beta });
    case RecipeActions.AddHopAddition:
      return Object.assign({}, state, { additions: state.additions.concat(hopAddition(undefined, action)) });
    case RecipeActions.RemoveHopAddition:
      return Object.assign({}, state, { additions: state.additions.filter(a => a.id !== action.addition.id) });
    case RecipeActions.SetHopAdditionTime:
    case RecipeActions.SetHopAdditionWeight:
      return Object.assign({}, state, {
        additions: state.additions.map(a => a.id === action.addition.id ? hopAddition(a, action) : a)
      });
    case RecipeActions.SetBoilTime:
      return Object.assign({} ,state, {
        additions: state.additions.map(a => hopAddition(a, action))
      });
    default:
      return state;
  }
};

hop.create = createHop;

export default hop;