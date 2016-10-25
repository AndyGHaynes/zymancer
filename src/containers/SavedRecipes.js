import { connect } from 'react-redux';
import SavedRecipes from '../components/SavedRecipes';
import { RecipeType } from '../constants/AppConstants';
import actions from '../actions';
import _ from 'lodash';

function mapState(state) {
  return _.pick(state.recipes, RecipeType.SavedRecipes, RecipeType.SharedRecipes, RecipeType.PublicRecipes);
}

function mapDispatch(dispatch) {
  return {
    retrieveRecipes: (recipeType) => dispatch(actions.saved.fetchRecipesIfNeeded(recipeType))
  };
}

export default connect(mapState, mapDispatch)(SavedRecipes);