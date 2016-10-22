import RecipeActions from '../constants/RecipeActionTypes';
import Defaults from '../constants/Defaults';
import { ExtractType, ExtractGravity } from '../constants/AppConstants';
import measurement from './measurement';
import _ from 'lodash';

function createGrain(grain) {
  const props = _.pick(grain, 'id', 'name', 'mfg', 'DBCG', 'DBFG', 'isExtract', 'category', 'description', 'flavor');
  const extractType = grain.isExtract ? (grain.extractType || ExtractType.Dry) : null;
  return Object.assign(props, {
    weight: grain.weight || Defaults.GrainWeight,
    gravity: grain.gravity || (extractType ? ExtractGravity[extractType] : 1),
    lovibond: parseFloat(grain.lovibond),
    lintner: parseFloat(grain.lintner) || 0,
    characteristics: typeof grain.characteristics === 'object' ? grain.characteristics.split(',') : grain.characteristics,
    extractType
  });
}

const grain = (state = {}, action) => {
  switch (action.type) {
    case RecipeActions.AddGrain:
      return createGrain(action.grain);
    case RecipeActions.SetGrainWeight:
      return Object.assign({}, state, { weight: measurement(state.weight, action) });
    case RecipeActions.SetGrainGravity:
      return Object.assign({}, state, { gravity: action.gravity });
    case RecipeActions.SetGrainLovibond:
      return Object.assign({}, state, { lovibond: action.lovibond });
    case RecipeActions.SetGrainLintner:
      return Object.assign({}, state, { lintner: action.lintner });
    case RecipeActions.SetGrainExtractType:
      const { extractType } = action;
      return Object.assign({}, state, { extractType, gravity: ExtractGravity[action.extractType] });
    default:
      return state;
  }
};

grain.create = createGrain;

export default grain;