import {
  FilterGrainResults,
  UpdateGrainResults,
  ClearGrainSearch,
  FilterHopResults,
  UpdateHopResults,
  ClearHopSearch,
  FilterYeastResults,
  UpdateYeastResults,
  ClearYeastSearch
} from '../constants/SearchActionTypes';
import {
  IngredientType,
  MinSearchQueryLength
} from '../constants/AppConstants';
import fetch from '../core/fetch';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';

export function filterGrainResults(query) {
  return { type: FilterGrainResults, query };
}

export function updateGrainResults({ data }) {
  return {
    type: UpdateGrainResults,
    results: data.searchGrains.map(g => grain.create(g))
  };
}

export function clearGrainSearch() {
  return { type: ClearGrainSearch };
}

export function filterHopResults(query) {
  return { type: FilterHopResults, query };
}

export function updateHopResults({ data }) {
  return {
    type: UpdateHopResults,
    results: data.searchHops.map(h => hop.create(h))
  };
}

export function clearHopSearch() {
  return { type: ClearHopSearch };
}

export function filterYeastResults(query) {
  return { type: FilterYeastResults, query };
}

export function updateYeastResults({ data }) {
  return {
    type: UpdateYeastResults,
    results: data.searchYeast.map(y => yeast.create(y))
  };
}

export function clearYeastSearch() {
  return { type: ClearYeastSearch };
}

const ingredientTypeMap = {
  [IngredientType.Grain]: {
    filter: filterGrainResults,
    update: updateGrainResults,
    buildQuery: q => `{searchGrains(query:"${q}"){id,name,gravity,lovibond,flavor,characteristics,mfg}}`
  },
  [IngredientType.Hop]: {
    filter: filterHopResults,
    update: updateHopResults,
    buildQuery: q => `{searchHops(query:"${q}"){id,name,url,aroma,categories,alpha,beta}}`
  },
  [IngredientType.Yeast]: {
    filter: filterYeastResults,
    update: updateYeastResults,
    buildQuery: q => `{searchYeast(query:"${q}"){id,name,url,code,attenuationRange,description,flocculation,rangeF,rangeC,tolerance,mfg,styles}}`
  }
};

export function queryIngredients(ingredientType, query) {
  return (dispatch, getState, helpers) => {
    const { filter, update, buildQuery } = ingredientTypeMap[ingredientType];
    dispatch(filter(query));
    return query.length >= MinSearchQueryLength
        && helpers.graphqlRequest(buildQuery(query))
              .then(json => dispatch(update(json)));
  };
}