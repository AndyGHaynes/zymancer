import SRMColors from '../constants/SRMColors';
import Units from '../constants/Units';
import helpers from './helpers';
import { ExtractGravity, HopAdditionType, HopForm, RecipeParameter } from '../constants/AppConstants';
import Defaults from '../constants/Defaults';
import BJCPStyles from '../constants/BJCPStyles';
import round from 'lodash/round';
import sumBy from 'lodash/sumBy';
import pick from 'lodash/pick';

const _rxNamedQty = /((?:[0-9]+[.]?[0-9]*)[\s|]*(?:lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt))[.]?(?: \((?:[0-9]+[.]?[0-9]*)[\s|]*(?:lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt)[.]?\))?[\s|]{1,5}([ a-z®äöüß0-9\-\"/°]+[a-z®äöüß\"°])/i;
const _rxTime = /((?:[0-9]+[.]?[0-9]*)\s*(?:minutes|minute|min|hours|hour|hr)|(?:@|at :)\d+\.?\d*)/i;
const _rxAlpha = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:aa|aau|alpha|a.a.)/i;
const _rxIBU = /([0-9]+[.]?[0-9]*)\s*[%]?\s*(?:IBU)/i;
const _rxPercent = /([0-9]+[.]?[0-9]*)(?:\s*%)/i;
const _rxLovibond = /([0-9]+[.]?[0-9]*)(?:°\s)*(?:Lovibond|Lov|L)/i;
const _rxHopForm = /(pellets|pellet|whole leaf|whole|leaf)/i;
const _rxHopAddition = /(dry hop|dry-hop|dry|hopback|hop-back|whirlpool|whirl-pool|whirl pool|hopstand|hop-stand|hop stand)/i;
const _rxGravity = /(1\.[0-9]{3})/i;
const _rxPlato = /([0-9]+[.]?[0-9]*)°\s*(?:Plato|P)/i;
const _rxPPG = /([0-9]+[.]?[0-9]*)\s*(?:PPG)/i;
const _rxSRM = /([0-9]+[.]?[0-9]*)\s*SRM/i;
const _rxYeast = /(?:(white labs|wyeast|wyeast labs|safale|imperial|imperial yeast)\s*((?:wlp|[a-z]|us-)?\d{2,6}(?:-pc)?)|((?:wlp|us-)\d{2,6}(?:-pc)?))/i;
const _rxAddition = /(whirlfloc|yeast nutrient|nutrient|calcium chloride|canning salt|iodized salt|salt|gypsum|irish moss|isinglass)/i;
const _rxSoleNumeric = /([0-9]+[.]?[0-9]*)\s+(?!SG|%|SRM|IBU|lbs|lb|oz|kg|tsp|tbsp|liter|l|gallon|gal|quart|g|qt|minutes|minute|min|hours|hour|hr|aa|aau|alpha|a.a.|Lovibond|Lov|L)/ig;
const _rxRecipeParameter = /(boil time|boiling time|batch size|yield|for|boil size|original gravity|final gravity|terminal gravity|og|fg|attenuation|srm|color|ibu|ibus|bitterness|plato|efficiency|abv|alcohol by volume|alcohol by vol)[ a-z()=:]+((?:[0-9]+[.]?[0-9]*)[°]?\s*(?:%|minutes|minute|min|sg|ibu|srm|gallons|gallon|gal|us gallons|us gallon|us gal)?)/i;

const _unitMapping = {
  'lbs': Units.Pound,
  'lb': Units.Pound,
  'oz': Units.Ounce,
  'kg': Units.Kilogram,
  'tsp': Units.Teaspoon,
  'tbsp': Units.Tablespoon,
  'liter': Units.Liter,
  'l': Units.Liter,
  'gallon': Units.Gallon,
  'gal': Units.Gallon,
  'quart': Units.Quart,
  'qt': Units.Quart,
  'g': Units.Gram,
  'minutes': Units.Minute,
  'minute': Units.Minute,
  'min': Units.Minute,
  'hours': Units.Hour,
  'hour': Units.Hour,
  'hr': Units.Hour
};

const _hopAdditionMapping = {
  'pellets': HopForm.Pellet,
  'pellet': HopForm.Pellet,
  'whole leaf': HopForm.Leaf,
  'whole': HopForm.Leaf,
  'leaf': HopForm.Leaf,
  'dry hop': HopAdditionType.Dry,
  'dry-hop': HopAdditionType.Dry,
  'dry': HopAdditionType.Dry,
  'hopback': HopAdditionType.HopBack,
  'hop-back': HopAdditionType.HopBack,
  'whirlpool': HopAdditionType.Whirlpool,
  'whirl-pool': HopAdditionType.Whirlpool,
  'whirl pool': HopAdditionType.Whirlpool,
  'hopstand': HopAdditionType.Whirlpool,
  'hop-stand': HopAdditionType.Whirlpool,
  'hop stand': HopAdditionType.Whirlpool
};

const _parameterMapping = {
  'boil time': RecipeParameter.BoilTime,
  'boiling time': RecipeParameter.BoilTime,
  'batch size': RecipeParameter.TargetVolume,
  'yield': RecipeParameter.TargetVolume,
  'for': RecipeParameter.TargetVolume,
  'boil size': RecipeParameter.BoilVolume,
  'original gravity': RecipeParameter.OriginalGravity,
  'final gravity': RecipeParameter.FinalGravity,
  'terminal gravity': RecipeParameter.FinalGravity,
  'og': RecipeParameter.OriginalGravity,
  'fg': RecipeParameter.FinalGravity,
  'attenuation': RecipeParameter.Attenuation,
  'srm': RecipeParameter.SRM,
  'color': RecipeParameter.SRM,
  'ibu': RecipeParameter.IBU,
  'ibus': RecipeParameter.IBU,
  'bitterness': RecipeParameter.IBU,
  //'plato': RecipeParameter.Plato,
  'efficiency': RecipeParameter.Efficiency,
  'abv': RecipeParameter.ABV,
  'alcohol by volume': RecipeParameter.ABV,
  'alcohol by vol': RecipeParameter.ABV
};

function parseLine(line) {
  const match = _rxNamedQty.exec(line);

  if (match) {
    const extractGroup = (regex) => ((m) => m && m[1].trim())(regex.exec(line));

    const parsed = {
      quantity: match[1],
      name: match[2].trim(),
      alpha: extractGroup(_rxAlpha),
      ibu: extractGroup(_rxIBU),
      hopForm: extractGroup(_rxHopForm),
      hopAddition: extractGroup(_rxHopAddition),
      time: extractGroup(_rxTime),
      percentage: extractGroup(_rxPercent),
      lovibond: extractGroup(_rxLovibond),
      srm: extractGroup(_rxSRM),
      gravity: extractGroup(_rxGravity),
      plato: extractGroup(_rxPlato),
      ppg: extractGroup(_rxPPG),
      addition: extractGroup(_rxAddition)
    };

    const freeNumbers = line.match(_rxSoleNumeric);

    if (!parsed.addition) {
      // no alpha but definitely a hop, try a lone number that looks appropriate
      if (parsed.time && (parsed.hopForm || parsed.hopAddition) && (parsed.alpha || parsed.ibu) === null && freeNumbers) {
        const alpha = freeNumbers[0];
        if (alpha >= 0 && alpha < 25) {
          parsed.alpha = alpha;
        }
      } else if ((parsed.alpha || parsed.time) === null && ((parsed.gravity || parsed.plato || parsed.ppg) === null || (parsed.lovibond || parsed.srm) === null) && freeNumbers) {
        // no gravity or srm, best take whatever's close to being within range
        freeNumbers.forEach((n) => {
          if (parsed.ppg === null && n > 25 && n < 44) {
            parsed.ppg = n;
          } else if (parsed.lovibond === null && parsed.srm === null && n > 1 && n < 600) {
            parsed.lovibond = n;
          }
        });
      }
    }

    return parsed;
  } else {
    // is it a recipe parameter?
    const recipeParameter = line.match(_rxRecipeParameter);
    if (recipeParameter) {
      return {
        parameter: recipeParameter[1],
        value: recipeParameter[2]
      };
    }

    // maybe it's yeast?
    let yeast = line.match(_rxYeast);
    if (yeast) {
      yeast = yeast.slice(1);
      const mfg = yeast[0];
      return {
        code: yeast[mfg ? 1 : 2].toString(),
        mfg
      };
    }

    // check against style
    const style = BJCPStyles.map(s => ({ name: s.name.toLowerCase(), id: s.id }))
                            .filter(s => line.toLowerCase().includes(s.name))
                            .map(s => s.id)[0];

    if (style) {
      return { style };
    }

  }

  return null;
}

function extractNumeric(str) {
  if (str) {
    return ((m) => m && parseFloat(m[0]))(str.match(/\d+(?:[.\d]{2,})?/));
  }

  return null;
}

function parseQuantity(qty) {
  if (qty) {
    let quantity = { value: extractNumeric(qty) };
    const unit = ((u) => _unitMapping[u] || null)(qty.replace(/[\W\d]+/i, '').toLowerCase().trim());
    if (unit) {
      quantity.unit = unit;
    }
    return quantity;
  }

  return null;
}

function buildRecipe(parsed) {
  const recipe = {
    styleId: null,
    grains: [],
    hops: [],
    yeast: [],
    additions: [],
    parameters: []
  };

  function createProp(obj) {
    Object.keys(obj).forEach(k => obj[k] === null || typeof obj[k] === 'undefined' ? delete obj[k] : {});
    return obj;
  }

  parsed.filter(p => p !== null).forEach(p => {
    if (p.quantity) {
      let weight = parseQuantity(p.quantity);

      if (p.addition) {
        recipe.additions.push(createProp({
          name: p.name,
          time: extractNumeric(p.time),
          weight
        }));
      } else if (p.alpha || p.time || p.hopAddition || p.hopForm) {
        const mapHopDetail = (d) => d && _hopAdditionMapping[d.toLowerCase()];

        recipe.hops.push(createProp({
          name: p.name.replace(_rxHopForm, '').replace(/(hops|hop|at)(\s|:|$)+/ig, '').trim(),
          alpha: extractNumeric(p.alpha || p.percentage),
          ibu: extractNumeric(p.ibu),
          form: mapHopDetail(p.hopForm),
          additions: [{
            minutes: extractNumeric(p.time),
            type: mapHopDetail(p.hopAddition) || HopAdditionType.Boil,
            weight
          }]
        }));
      } else if (p.name && !p.time && p.name.toLowerCase() !== 'total') {
        p.gravity = extractNumeric(p.gravity);
        if (!p.gravity) {
          if (extractNumeric(p.ppg)) {
            p.gravity = pointsToGravity(extractNumeric(p.ppg));
          } else if (extractNumeric(p.plato)) {
            p.gravity = platoToGravity(extractNumeric(p.plato));
          }
        }

        p.lovibond = extractNumeric(p.lovibond);
        if (!p.lovibond) {
          p.lovibond = extractNumeric(p.srm);
        }

        recipe.grains.push(createProp({
          name: p.name,
          gravity: p.gravity,
          lovibond: p.lovibond,
          weight
        }));
      }
    } else if (p.code) {
      recipe.yeast.push(p);
    } else if (p.parameter) {
      recipe.parameters.push(createProp({
        parameter: _parameterMapping[p.parameter.toLowerCase()] || p.parameter,
        quantity: parseQuantity(p.value),
        value: extractNumeric(p.value)
      }));
    } else if (p.style) {
      recipe.styleId = p.style;
    }
  });

  return recipe;
}

export default function parseText(recipeText) {
  return buildRecipe(recipeText.split('\n')
                               .filter(l => l.trim().length > 0)
                               .map(l => parseLine(l.trim())));
}