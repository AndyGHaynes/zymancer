import RecipeActions from '../constants/RecipeActionTypes';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import Defaults from '../constants/Defaults';
import measurement from './measurement';
import Units from '../constants/Units';

const emptyVolume = { value: 0, unit: Units.Quart };
const initialState = {
  style: 'Infusion Sparge',
  thickness: Defaults.MashThickness,
  boilOff: Defaults.BoilOffRate,
  absorption: Defaults.GrainAbsorptionLoss,
  grainTemp: Defaults.GrainTemp,
  infusionTemp: Defaults.InfusionTemp,
  mashoutTemp: Defaults.MashoutTemp,
  strikeTemp: zymath.calculateStrikeWaterTemp(Defaults.MashThickness, Defaults.GrainTemp, Defaults.InfusionTemp),
  spargeTemp: { value: 0, unit: Units.Fahrenheit },
  strikeVolume: emptyVolume,
  spargeVolume: emptyVolume
};

const convertRatioDelta = (ratio, delta) => {
  return helpers.convertRatio(ratio, Object.assign({}, ratio, delta), 2);
};

const mashSchedule = (state = initialState, action) => {
  switch (action.type) {
    case RecipeActions.SetMashStyle:
      return Object.assign({}, state, {
        style: action.style
      });
    case RecipeActions.SetMashThickness:
      return Object.assign({}, state, {
        thickness: convertRatioDelta(state.thickness, action.thickness)
      });
    case RecipeActions.SetBoilOff:
      return Object.assign({}, state, {
        boilOff: convertRatioDelta(state.boilOff, action.boilOff)
      });
    case RecipeActions.SetGrainAbsorption:
      return Object.assign({}, state, {
        absorption: convertRatioDelta(state.absorption, action.absorption)
      });
    case RecipeActions.SetInfusionTemp:
      return Object.assign({}, state, {
        infusionTemp: measurement(state.infusionTemp, action)
      });
    case RecipeActions.SetMashoutTemp:
      return Object.assign({}, state, {
        mashoutTemp: measurement(state.mashoutTemp, action)
      });
    case RecipeActions.SetGrainTemp:
      return Object.assign({}, state, {
        grainTemp: measurement(state.grainTemp, action)
      });
    default:
      return state;
  }
};

export default mashSchedule;