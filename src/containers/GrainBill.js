import { connect } from 'react-redux';
import actions from '../actions';
import GrainBill from '../components/GrainBill';
import MobileGrainBill from '../components/_mobile/GrainBill';
import pick from 'lodash/pick';

const { recipe } = actions;

function mapState(state) {
  return pick(state.currentRecipe, 'grains', 'targetVolume');
}

function mapDispatch(dispatch) {
  return {
    actions: {
      removeGrain: (grain) => dispatch(recipe.removeGrain(grain)),
      setWeight: (grain, weight) => dispatch(recipe.setGrainWeight(grain, weight)),
      setGravity: (grain, gravity) => dispatch(recipe.setGrainGravity(grain, gravity)),
      setLovibond: (grain, lovibond) => dispatch(recipe.setGrainLovibond(grain, lovibond)),
      setLintner: (grain, lintner) => dispatch(recipe.setGrainLintner(grain, lintner)),
      setExtractType: (grain, extractType) => dispatch(recipe.setGrainExtractType(grain, extractType))
    }
  };
}

export default connect(mapState, mapDispatch)(GrainBill);
export const MobileGrainContainer = connect(mapState, mapDispatch)(MobileGrainBill);