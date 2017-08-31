import { connect } from 'react-redux';
import RecipeParser from '../components/RecipeParser';
import actions from '../actions';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import pick from 'lodash/pick';

function mapState(state) {
  return {
    parser: state.recipeParser,
    searchCache: state.ingredientSearch.cache
  };
}

function mapDispatch(dispatch) {
  function loadParsedRecipe({ recipe, suggestions }) {
    function buildSuggestion(ingredient, key, overrideProps = []) {
      const ingredientSuggestion = suggestions[key].find(s => s.id === ingredient.id);
      const selectedIngredient = Object.assign({}, ingredientSuggestion.suggestions.find(s => s.active));
      const parsedFields = pick(ingredient, overrideProps);

      Object.keys(parsedFields).forEach(overrideKey => {
        if (parsedFields[overrideKey]) {
          // only take names if the selected match didn't have one
          if (overrideKey !== 'name' || selectedIngredient[overrideKey] === undefined) {
            selectedIngredient[overrideKey] = parsedFields[overrideKey];
          }
        }
      });

      const create = ({
        'grains': grain,
        'hops': hop,
        'yeast': yeast
      }[key]).create;

      return Object.assign(create(selectedIngredient), {suggestions: ingredient.suggestions });
    }

    recipe.grains = recipe.grains.map(g => buildSuggestion(g, 'grains', ['name', 'weight', 'lovibond']));
    recipe.hops = recipe.hops.map(h => buildSuggestion(h, 'hops', ['name', 'alpha', 'beta', 'additions']));
    recipe.fermentation = { yeasts: recipe.yeast.map(y => buildSuggestion(y, 'yeast')) };

    return dispatch(actions.saved.loadSavedRecipe(recipe));
  }

  return {
    actions: {
      loadParsedRecipe,
      clear: () => dispatch(actions.parser.clear()),
      updateRecipeText: (recipeText) => dispatch(actions.parser.updateRecipeText(recipeText)),
      parseRecipeText: (recipeText, searchCache) => dispatch(actions.parser.parseRecipeText(recipeText, searchCache)),
      selectIngredientSuggestion: (ingredientKey, matchId, suggestionId) =>
        dispatch(actions.parser.selectIngredientSuggestion(ingredientKey, matchId, suggestionId)),
      selectParsedIngredient: (lineNumber) => dispatch(actions.parser.selectParsedIngredient(lineNumber))
    }
  };
}

export default connect(mapState, mapDispatch)(RecipeParser);
