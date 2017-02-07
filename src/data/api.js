import { RecipeType, RecipeParameter } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import { IngredientType, MinSearchQueryLength } from '../constants/AppConstants';
import fetch from '../core/fetch';
import helpers from '../utils/helpers';
import grain from '../reducers/grain';
import hop from '../reducers/hop';
import yeast from '../reducers/yeast';
import mashSchedule from '../reducers/mashSchedule';
import pick from 'lodash/pick';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';
import round from 'lodash/round';

async function _graphqlFetch(query) {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query }),
    credentials: 'include'
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return await resp.json();
}

function _groupHops(hops) {
  const grouped = [];
  const hashGroup = groupBy(hops, h => [h.form, h.name, h.alpha, h.beta].join('-'));
  Object.keys(hashGroup).forEach(k => {
    grouped.push(Object.assign({}, hashGroup[k][0], {
      additions: flatten(hashGroup[k].map(h => h.additions || [pick(h, 'minutes', 'weight')]))
    }));
  });
  return grouped;
}

const _styleKeys = `
  id,
  name,
  code,
  description,
  overallImpression,
  aroma,
  appearance,
  flavor,
  mouthfeel,
  comments,
  history,
  characteristics,
  styleComparison,
  ogLow,
  ogHigh,
  fgLow,
  fgHigh,
  ibuLow,
  ibuHigh,
  srmLow,
  srmHigh,
  abvLow,
  abvHigh,
  commercialExamples
`;

const _grainKeys = `
  id,
  name,
  gravity,
  isExtract,
  DBCG,
  DBFG,
  lovibond,
  lintner,
  flavor,
  characteristics,
  mfg
`;

const _hopKeys = `
  id,
  name,
  url,
  aroma,
  categories,
  alpha,
  beta
`;

const _yeastKeys = `
  id,
  name,
  mfg,
  code,
  url,
  styles,
  description,
  flocculation,
  toleranceLow,
  toleranceHigh,
  temperatureLow,
  temperatureHigh,
  attenuationLow,
  attenuationHigh
`;

export async function getRecipe(recipeId) {
  const query = `{
    loadRecipe(id:${recipeId}) {
      id,
      name,
      style {
        id
      },
      method,
      volume {
        value,
        unit
      },
      grains {
        id,
        name,
        gravity,
        lovibond,
        lintner,
        isExtract,
        DBCG,
        DBFG,
        weight {
          value,
          unit
        }
      },
      hops {
        id,
        name,
        alpha,
        beta,
        categories,
        minutes,
        form,
        type,
        weight {
          value,
          unit
        }
      },
      yeasts {
        id,
        name,
        mfg,
        code,
        styles,
        description,
        toleranceLow,
        toleranceHigh,
        temperatureLow,
        temperatureHigh,
        mfgDate,
        attenuationLow,
        attenuationHigh,
        apparentAttenuation,
        quantity,
        flocculation
      },
      fermentation {
        pitchRateMillionsMLP
      },
      mashSchedule {
        style,
        thickness { value, antecedent, consequent },
        absorption { value, antecedent, consequent },
        boilOff { value, antecedent, consequent },
        grainTemp { value, unit },
        infusionTemp { value, unit },
        mashoutTemp { value, unit }
      }
    }
  }`.replace(/\s/g, '');

  const { data } = await _graphqlFetch(query);
  let { grains, hops, yeasts, fermentation, mashSchedule: _mashSchedule } = data.loadRecipe;

  function setMeasurementRanges(measurement, defaultMeasurement) {
    // TODO: convert ratio to handle different saved units
    return Object.assign(measurement, pick(defaultMeasurement, 'min', 'max'));
  }

  return Object.assign({}, data.loadRecipe, {
    targetVolume: data.loadRecipe.volume,
    grains: grains.map(g => grain.create(g)),
    hops: _groupHops(hops).map(h => hop.create(h)),
    fermentation: {
      pitchRate: fermentation.pitchRateMillionsMLP,
      yeasts: yeasts.map(y => yeast.create(y))
    },
    mashSchedule: (mash => Object.assign({}, mash, {
      thickness: setMeasurementRanges(mash.thickness, Defaults.MashThickness),
      boilOff: setMeasurementRanges(mash.boilOff, Defaults.BoilOffRate),
      absorption: setMeasurementRanges(mash.absorption, Defaults.GrainAbsorptionLoss),
      infusionTemp: setMeasurementRanges(mash.infusionTemp, Defaults.InfusionTemp),
      mashoutTemp: setMeasurementRanges(mash.mashoutTemp, Defaults.MashoutTemp)
    }))(mashSchedule.create(_mashSchedule))
  });
}

export async function saveRecipe(recipe) {
  const grains = recipe.grains.map(g => {
    return pick(g, 'id', 'weight', 'lovibond', 'lintner', 'gravity')
  }).map(g => helpers.jsonToGraphql(
    Object.assign(g, {
      lovibond: parseFloat(g.lovibond),
      lintner: parseFloat(g.lintner),
      gravity: parseFloat(g.gravity),
      weight: Object.assign({}, g.weight, { value: parseFloat(g.weight.value) })
    })
  ));

  const hops = flatten(recipe.hops.map(h => h.additions.map(a => Object.assign(
    pick(h, 'id', 'alpha', 'beta', 'form'),
    pick(a, 'minutes', 'weight', 'type')
  )))).map(h => helpers.jsonToGraphql(Object.assign(h, {
    alpha: parseFloat(h.alpha),
    beta: parseFloat(h.beta),
    minutes: parseFloat(h.minutes),
    weight: Object.assign({}, h.weight, { value: parseFloat(h.weight.value) })
  })));

  const yeast = recipe.fermentation.yeasts.map(y => helpers.jsonToGraphql(Object.assign(pick(y, 'id', 'quantity'), {
    mfgDate: y.mfgDate.toString(),
    apparentAttenuation: round(y.apparentAttenuation / 100, 2)
  })));

  function parseValue(m) {
    m.value = parseFloat(m.value);
    return m;
  }

  const cleanMeasurement = (measurement) => parseValue(pick(measurement, 'value', 'unit'));
  const cleanRatio = (ratio) => parseValue(pick(ratio, 'value', 'antecedent', 'consequent'));

  const volume = helpers.jsonToGraphql(cleanMeasurement(recipe.targetVolume));
  const mashSchedule = helpers.jsonToGraphql(Object.assign(
    pick(recipe.mashSchedule, 'style'),
    { thickness: cleanRatio(recipe.mashSchedule.thickness) },
    { absorption: cleanRatio(recipe.mashSchedule.absorption) },
    { boilOff: cleanRatio(recipe.mashSchedule.boilOff) },
    { grainTemp: cleanMeasurement(recipe.mashSchedule.grainTemp) },
    { infusionTemp: cleanMeasurement(recipe.mashSchedule.infusionTemp) },
    { mashoutTemp: cleanMeasurement(recipe.mashSchedule.mashoutTemp) }
  ));

  const fermentation = helpers.jsonToGraphql({
    pitchRateMillionsMLP: parseFloat(recipe.fermentation.pitchRate)
  });

  const style = helpers.jsonToGraphql({
    id: recipe.style.id
  });

  const query = `{
    saveRecipe(
      id:${recipe.id || -1},
      name:"${recipe.name}",
      style:${style},
      method:"${recipe.method}",
      volume:${volume},
      ABV:${round(parseFloat(recipe.ABV), 2)},
      IBU:${round(parseFloat(recipe.IBU), 2)},
      OG:${parseFloat(recipe.originalGravity)},
      FG:${parseFloat(recipe.finalGravity)},
      grains:[${grains.join(',')}],
      hops:[${hops.join(',')}],
      yeasts:[${yeast.join(',')}],
      mashSchedule:${mashSchedule},
      fermentation:${fermentation}
    ) { id }
  }`;

  const { data } = await _graphqlFetch(query);
  return data.saveRecipe.id;
}

export async function getSavedRecipes(recipeType) {
  const query = {
    [RecipeType.SavedRecipes]: 'savedRecipes',
    [RecipeType.SharedRecipes]: 'sharedRecipes',
    [RecipeType.PublicRecipes]: 'publicRecipes'
  }[recipeType];
  const { data } = await _graphqlFetch(`{${query}{ id, name, style { id, code, name }, ABV, IBU, OG, FG }}`);
  return data[query] || [];
}

export async function getStyle(styleId) {
  return await _graphqlFetch(`{style(id:${styleId}) { ${_styleKeys} }}`);
}

function buildTokenScore(query, resolveTokens, blacklist = []) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/g)
    .filter(s => !blacklist.includes(s))
    .forEach(resolveTokens);
}

function partialMatchIngredient(query, tokens, blacklist) {
  const scores = {};
  buildTokenScore(query, (s) => {
    Object.keys(tokens).forEach((token) => {
      const updateScore = (value) => tokens[token].forEach(id => scores[id] = (scores[id] || 0) + value);
      const freqFactor = 100 / tokens[token].length;

      if (token === s) {
        updateScore(10 * freqFactor);
      } else if (token.startsWith(s) || token.endsWith(s)) {
        updateScore(5 * freqFactor);
      } else if (token.includes(s)) {
        updateScore(freqFactor);
      }
    });
  }, blacklist);

  if (Object.keys(scores).length) {
    return Object.keys(scores)
      .map(s => parseInt(s))
      .sort((k, l) => scores[l] - scores[k]);
  }

  return null;
}

export async function buildParsedRecipe(parsed, searchCache) {
  const ingredientMap = {};
  function matchingIdStr(ingredients, tokens, blacklist) {
    return [...new Set([...new Set(ingredients)]
      .map(i => {
        const match = partialMatchIngredient(i, tokens, blacklist);
        if (match !== null) {
          ingredientMap[i] = match[0];
          return ingredientMap[i];
        }
      })
      .filter(i => typeof i !== 'undefined')
    )];
  }

  const getName = (i) => i.name;
  const getNameOrCode = (i) => i.name || i.code;

  const [parsedGrains, parsedHops, parsedYeast] = [
    matchingIdStr(parsed.grains.map(getName), searchCache[IngredientType.Grain], ['malt']),
    matchingIdStr(parsed.hops.map(getName), searchCache[IngredientType.Hop], ['hop']),
    matchingIdStr(parsed.yeast.map(getNameOrCode), searchCache[IngredientType.Yeast], ['yeast'])
  ];

  const query = `{
    matchParsedIngredients(
      ${parsed.styleId ? `style: { id: ${parsed.styleId} },` : ''}
      grains: [${parsedGrains}],
      hops: [${parsedHops}],
      yeast: [${parsedYeast}]
    ) {
      grains {${_grainKeys}},
      hops {${_hopKeys}},
      yeast {
        ${_yeastKeys},
        apparentAttenuation
      },
      style {${_styleKeys}}
    }
  }`;

  const { data } = await _graphqlFetch(query);
  const recipe = data.matchParsedIngredients;

  parsed.parameters.forEach(p => {
    switch (p.parameter) {
      case RecipeParameter.BoilTime:
        recipe.boilMinutes = p.quantity.value;
        break;
      case RecipeParameter.BrewMethod:
        recipe.brewMethod = p.quantity.value;
        break;
      case RecipeParameter.Efficiency:
        recipe.efficiency = p.value;
        break;
      case RecipeParameter.TargetVolume:
        recipe.targetVolume = Object.assign({}, Defaults.TargetVolume, p.quantity);
        break;
      //case RecipeParameter.Attenuation:
      //  break;
      // what to do with calculated values?
      //case RecipeParameter.BoilVolume:
      //case RecipeParameter.FinalGravity:
      //case RecipeParameter.OriginalGravity:
      //case RecipeParameter.IBU:
      //case RecipeParameter.SRM:
      //case RecipeParameter.ABV:
    }
  });

  function mergeIngredients(ingredients, retrieved, create, getIngredientKey) {
    if (ingredients) {
      return ingredients.map(i => {
        const matching = retrieved && retrieved.find(r => ingredientMap[getIngredientKey(i)] === r.id);
        if (matching) {
          return Object.assign({}, matching, i);
        }
        return i;
      }).map(i => create(i));
    }

    return [];
  }

  if (recipe.style === null) {
    delete recipe.style;
  }

  const grains = mergeIngredients(parsed.grains, recipe.grains, grain.create, getName);
  const hops = mergeIngredients(_groupHops(parsed.hops), recipe.hops, hop.create, getName);
  const yeasts = mergeIngredients(parsed.yeast, recipe.yeast, yeast.create, getNameOrCode);

  return Object.assign(recipe, {
    grains,
    hops,
    fermentation: {
      pitchRate: Defaults.PitchRate,
      yeasts
    }
  });
}

export async function tokenizeIngredients() {
  function histogramReduce(blacklist, props) {
    return (tokens, ingredient) => {
      props.filter(p => ingredient[p]).forEach(key => {
        ingredient[key]
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ' ')
          .split(/\s+/g)
          .forEach(i => {
            if (i && !blacklist.includes(i)) {
              if (!tokens.hasOwnProperty(i)) {
                tokens[i] = [];
              }
              tokens[i].push(ingredient.id);
            }
          });
      });

      return tokens;
    };
  }

  const { data } = await _graphqlFetch(`{tokenizeIngredients {
    grains { id, name },
    hops { id, name },
    yeast { id, name, code }
  }}`);

  const ingredients = data.tokenizeIngredients;
  return {
    [IngredientType.Grain]: ingredients.grains.reduce(histogramReduce(['malt', 'ale'], ['name']), {}),
    [IngredientType.Hop]: ingredients.hops.reduce(histogramReduce(['hop'], ['name']), {}),
    [IngredientType.Yeast]: ingredients.yeast.reduce(histogramReduce(['yeast'], ['name', 'code']), {})
  };
}

export async function searchIngredients(ingredientType, query, searchCache) {
  if (query.length < MinSearchQueryLength) {
    return [];
  }

  async function fetchIngredients(key, fields) {
    const scores = partialMatchIngredient(query, searchCache[ingredientType]);
    if (scores === null) {
      return [];
    }

    const { data } = await _graphqlFetch(`{${key}(ids:[${scores.join(',')}]) {${fields}}}`);
    return data[key];
  }

  return await fetchIngredients.apply(null, {
    [IngredientType.Grain]: ['searchGrains', _grainKeys],
    [IngredientType.Hop]: ['searchHops', _hopKeys],
    [IngredientType.Yeast]: ['searchYeast', _yeastKeys]
  }[ingredientType]);
}