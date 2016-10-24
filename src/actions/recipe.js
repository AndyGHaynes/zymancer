import RecipeActions from '../constants/RecipeActionTypes';
import helpers from '../utils/helpers';
import actions from '../actions';
import { saveRecipe } from '../data/api';

function saveCurrentRecipe(recipe) {
  return async (dispatch) => {
    const recipeId = await saveRecipe(recipe);
    return dispatch(actions.recipe.recipeSaved(recipeId));
  };
}

export default {
  /***************************** grains ***************************/
  addGrain: helpers.createAction(RecipeActions.AddGrain, 'grain'),
  removeGrain: helpers.createAction(RecipeActions.RemoveGrain, 'grain'),
  setGrainWeight: helpers.createAction(RecipeActions.SetGrainWeight, 'grain', 'measurement'),
  setGrainGravity: helpers.createAction(RecipeActions.SetGrainGravity, 'grain', 'gravity'),
  setGrainLovibond: helpers.createAction(RecipeActions.SetGrainLovibond, 'grain', 'lovibond'),
  setGrainLintner: helpers.createAction(RecipeActions.SetGrainLintner, 'grain', 'lintner'),
  setGrainExtractType: helpers.createAction(RecipeActions.SetGrainExtractType, 'grain', 'extractType'),

  /***************************** hops *****************************/
  addHop: helpers.createAction(RecipeActions.AddHop, 'hop'),
  removeHop: helpers.createAction(RecipeActions.RemoveHop, 'hop'),
  addAddition: helpers.createAction(RecipeActions.AddHopAddition, 'hop'),
  setAdditionTime: helpers.createAction(RecipeActions.SetHopAdditionTime, 'addition', 'hop', 'minutes'),
  setAdditionWeight: helpers.createAction(RecipeActions.SetHopAdditionWeight, 'addition', 'hop', 'measurement'),
  removeAddition: helpers.createAction(RecipeActions.RemoveHopAddition, 'addition', 'hop'),
  setHopAlpha: helpers.createAction(RecipeActions.SetHopAlpha, 'hop', 'alpha'),
  setHopBeta: helpers.createAction(RecipeActions.SetHopBeta, 'hop', 'beta'),
  
  /************************* mash schedule ************************/
  setMashStyle: helpers.createAction(RecipeActions.SetMashStyle, 'style'),
  setMashThickness: helpers.createAction(RecipeActions.SetMashThickness, 'thickness'),
  setBoilOff: helpers.createAction(RecipeActions.SetBoilOff, 'boilOff'),
  setGrainAbsorption: helpers.createAction(RecipeActions.SetGrainAbsorption, 'absorption'),
  setInfusionTemp: helpers.createAction(RecipeActions.SetInfusionTemp, 'measurement'),
  setMashoutTemp: helpers.createAction(RecipeActions.SetMashoutTemp, 'measurement'),
  setGrainTemp: helpers.createAction(RecipeActions.SetGrainTemp, 'measurement'),
  
  /*************************** recipe *****************************/
  setRecipeName: helpers.createAction(RecipeActions.SetRecipeName, 'name'),
  setRecipeStyle: helpers.createAction(RecipeActions.SetRecipeStyle, 'style'),
  setRecipeMethod: helpers.createAction(RecipeActions.SetRecipeMethod, 'method'),
  setBoilVolume: helpers.createAction(RecipeActions.SetBoilVolume, 'measurement'),
  setTargetVolume: helpers.createAction(RecipeActions.SetTargetVolume, 'measurement'),
  setBoilTime: helpers.createAction(RecipeActions.SetBoilTime, 'minutes'),
  setEfficiency: helpers.createAction(RecipeActions.SetEfficiency, 'efficiency'),
  recipeSaved: helpers.createAction(RecipeActions.RecipeSaved),
  
  /************************* fermentation *************************/
  addYeast: helpers.createAction(RecipeActions.AddYeast, 'yeast'),
  removeYeast: helpers.createAction(RecipeActions.RemoveYeast, 'yeast'),
  setPitchRate: helpers.createAction(RecipeActions.SetPitchRate, 'rate'),
  setYeastMfgDate: helpers.createAction(RecipeActions.SetYeastMfgDate, 'yeast', 'date'),
  setYeastAttenuation: helpers.createAction(RecipeActions.SetYeastAttenuation, 'yeast', 'attenuation'),
  setYeastViability: helpers.createAction(RecipeActions.SetYeastViability, 'yeast', 'viability'),
  setYeastQuantity: helpers.createAction(RecipeActions.SetYeastQuantity, 'yeast', 'quantity'),
  addStarterStep: helpers.createAction(RecipeActions.AddStarterStep, 'yeast', 'gravity', 'hours'),
  removeStarterStep: helpers.createAction(RecipeActions.RemoveStarterStep, 'yeast'),

  // async
  saveCurrentRecipe
};