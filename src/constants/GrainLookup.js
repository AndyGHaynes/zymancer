import _ from 'lodash';
import { Pound } from './Units';

const GrainLookup = [
  { id: 1, name: "Crystal 10", category: "American", lovibond: "10", gravity: 1.033, description: "Sweet, mild caramel flavor and a golden color. Use in light lagers and light ales." },
  { id: 2, name: "Crystal 20", category: "American", lovibond: "20", gravity: 1.033, description: "Sweet, mild caramel flavor and a golden color. Use in light lagers and light ales." },
  { id: 3, name: "Crystal 30", category: "American", lovibond: "30", gravity: 1.033, description: "Sweet, mild caramel flavor and a golden color. Use in light lagers and light ales." },
  { id: 4, name: "Crystal 40", category: "American", lovibond: "40", gravity: 1.033, description: "Sweet, mild caramel flavor and a golden color. Use in light lagers and light ales." },
  { id: 5, name: "Crystal 60", category: "American", lovibond: "60", gravity: 1.033, description: "Sweet caramel flavor, deep golden to red color. For dark amber and brown ales." },
  { id: 6, name: "Crystal 80", category: "American", lovibond: "80", gravity: 1.033, description: "Sweet, smooth caramel flavor and a red to deep red color. For porters, old ales." },
  { id: 7, name: "Crystal 90", category: "American", lovibond: "90", gravity: 1.033, description: "Pronounced caramel flavor and a red color. For stouts, porters and black beers." },
  { id: 8, name: "Crystal 120", category: "American", lovibond: "120", gravity: 1.033, description: "Pronounced caramel flavor and a red color. For stouts, porters and black beers." },
  { id: 9, name: "Black Patent Malt", category: "American", lovibond: "500", gravity: 1.026, description: "Provides color and sharp flavor in stouts and porters." },
  { id: 10, name: "Roasted Barley", category: "American", lovibond: "300", gravity: 1.025, description: "Sweet, grainy, coffee flavor and a red to deep brown color. For porters and stouts." },
  { id: 11, name: "Black Barley", category: "American", lovibond: "525", gravity: 1.023, description: "Imparts dryness. Unmalted; use in porters and dry stouts." },
  { id: 12, name: "Chocolate Malt", category: "American", lovibond: "350", gravity: 1.034, description: "Use in all types to adjust color and add nutty, toasted flavor. Chocolate flavor." },
  { id: 13, name: "Dextrin Malt (carapils)", category: "American", lovibond: "1.5", gravity: 1.033, description: "Balances body and flavor without adding color, aids in head retention. For any beer." },
  { id: 14, name: "Pale Malt (Brewers 2-row)", category: "American", lovibond: "1.8", gravity: 1.037, description: "Smooth, less grainy, moderate malt flavor.  Basic malt for all beer styles." },
  { id: 15, name: "Pale Malt (Brewers 6-row)", category: "American", lovibond: "1.8", gravity: 1.035, description: "Moderate malt flavor.  Basic malt for all beer styles." },
  { id: 16, name: "Munich Malt", category: "American", lovibond: "10", gravity: 1.034, description: "Sweet, toasted flavor and aroma.  For Oktoberfests and malty styles." },
  { id: 17, name: "Special Roast", category: "American", lovibond: "50", gravity: 1.035, description: "Provides a deep golden to brown color for ales. Use in all darker ales." },
  { id: 18, name: "Vienna Malt", category: "American", lovibond: "3.5-4", gravity: 1.035, description: "Increases malty flavor, provides balance. Use in Vienna, Märzen and Oktoberfest." },
  { id: 19, name: "Victory Malt", category: "American", lovibond: "25", gravity: 1.034, description: "Provides a deep golden to brown color. Use in nut brown ales, IPAs and Scottish ales." },
  { id: 20, name: "Wheat Malt", category: "American", lovibond: "2", gravity: 1.038, description: "Light flavor and creamy head. For American weizenbier, weissbier and dunkelweiss." },
  { id: 21, name: "White Wheat Malt", category: "American", lovibond: "2", gravity: 1.037, description: "Imparts a  malty flavor.  For American wheat beers, wheat bock and doppel bock." },
  { id: 22, name: "Aromatic Malt", category: "Belgian", lovibond: "20-26", gravity: 1.036, description: "Imparts a big malt aroma.  Use in brown ales, Belgian dubbels and tripels." },
  { id: 23, name: "Biscuit Malt", category: "Belgian", lovibond: "23-25", gravity: 1.035, description: "Warm baked biscuit flavor and aroma. Increases body. Use in Belgian beers." },
  { id: 24, name: "Caramunich Malt", category: "Belgian", lovibond: "56", gravity: 1.033, description: "Caramel, full  flavor, copper color. For Belgian ales, German smoked and bocks." },
  { id: 25, name: "Caravienne Malt", category: "Belgian", lovibond: "21-22", gravity: 1.034, description: "Belgian light crystal malt. Used in lighter Abbey or Trappist style ales." },
  { id: 26, name: "Pale Ale Malt", category: "Belgian", lovibond: "2.7-3.8", gravity: 1.038, description: "Use as a base malt for any Belgian style beer with full body." },
  { id: 27, name: "Pilsen Malt", category: "Belgian", lovibond: "1.5", gravity: 1.037, description: "Light color, malty flavor. For pilsners, dubbels, tripels, whites and specialty ales." },
  { id: 28, name: "Special B Malt", category: "Belgian", lovibond: "130-220", gravity: 1.030, description: "Extreme caramel aroma and flavor. For dark Abbey beers and other dark beers." },
  { id: 29, name: "Scotmalt Golden Promise", category: "Scottish", lovibond: "2.4", gravity: 1.038, description: "Scottish pale ale malt; base malt for all Scottish beers." },
  { id: 30, name: "Flaked Barley", category: "Adjunct", lovibond: "1.5", gravity: 1.032, description: "Helps head retention, imparts creamy smoothness. For porters and stouts." },
  { id: 31, name: "Flaked Maize", category: "Adjunct", lovibond: "1", gravity: 1.037, description: "Lightens body and color. For light American pilsners and ales." },
  { id: 32, name: "Flaked Oats", category: "Adjunct", lovibond: "1", gravity: 1.033, description: "Adds body and creamy head. For stouts and oat ales." },
  { id: 33, name: "Flaked Rye", category: "Adjunct", lovibond: "2", gravity: 1.036, description: "Imparts a dry, crisp character. Use in rye beers." },
  { id: 34, name: "Flaked Wheat", category: "Adjunct", lovibond: "2", gravity: 1.036, description: "Imparts a wheat flavor, hazy color. For wheat and Belgian white beers." },
  { id: 35, name: "Gambrinus Honey Malt", category: "Canadian", lovibond: "25", gravity: 1.034, description: "Nutty honey flavor. For brown ales, Belgian wheats, bocks and many other styles." },
  { id: 36, name: "Grits", category: "Adjunct", lovibond: "1-1.5", gravity: 1.037, description: "Imparts a corn/grain taste. Use in American lagers." },
  //{ id: 37, name: "Irish Moss", category: "Fining", lovibond: "NA", gravity: NA, description: "Prevents chill haze. Use in all beers except cloudy wheat and white beers." },
  { id: 38, name: "Malto Dextrin", category: "Flavoring", lovibond: "NA", gravity: 1.043, description: "Adds body and mouthfeel.  For all extract beers. Does not ferment." },
  //{ id: 39, name: "Oak Chips", category: "Flavoring", lovibond: "NA", gravity: NA, description: "Creates cask-conditioned flavor and aroma. Use in IPAs, Belgian ales and Scottish ales. Steam for 15 minutes to sanitize." },
  { id: 40, name: "Amber Malt", category: "British", lovibond: "35", gravity: 1.032, description: "Roasted malt used  in British milds, old ales, brown ales, nut brown ales." },
  { id: 41, name: "Brown Malt", category: "British", lovibond: "65", gravity: 1.032, description: "Imparts a dry, biscuit flavor.  Use in porters, brown, nut brown and Belgian ales." },
  { id: 42, name: "Maris Otter Pale Malt", category: "British", lovibond: "3", gravity: 1.038, description: "Premium base malt for any beer. Good for pale ales." },
  { id: 43, name: "Pale Ale", category: "British", lovibond: "2.2", gravity: 1.038, description: "Moderate malt flavor.  Used to produce traditional English and Scottish style ales." },
  { id: 44, name: "Lager Malt", category: "British", lovibond: "1.6", gravity: 1.038, description: "Used to make light colored and flavored lagers." },
  { id: 45, name: "Crystal 55-60", category: "British", lovibond: "55-60", gravity: 1.033, description: "Sweet caramel flavor, adds mouthfeel and head retention. For pale or amber ales." },
  { id: 46, name: "Dark Crystal Malt", category: "British", lovibond: "145-188", gravity: 1.033, description: "Sweet caramel flavor, mouthfeel. For porters, stouts, old ales and any dark ale." },
  { id: 47, name: "Mild Ale Malt", category: "British", lovibond: "2.3-2.7", gravity: 1.037, description: "Dry, nutty malty flavor.  Promotes body.  Use in English mild ales." },
  { id: 48, name: "Cara-Pils Dextrin", category: "British", lovibond: "10-14", gravity: 1.033, description: "Adds body; aids head retention.  For porters, stouts and heavier bodied beers." },
  { id: 49, name: "Chocolate Malt", category: "British", lovibond: "395-475", gravity: 1.034, description: "Nutty, toasted flavor, brown color.  Use in brown ales, porters, stouts and bocks." },
  { id: 50, name: "Black Patent Malt", category: "British", lovibond: "500-600", gravity: 1.026, description: "Dry, burnt, chalky character.  Use in porters, stouts, brown ales and dark lagers." },
  { id: 51, name: "Peat Smoked Malt", category: "British", lovibond: "2.8", gravity: 1.034, description: "Imparts a robust smoky flavor and aroma.  For Scottish ales and wee heavies." },
  { id: 52, name: "Roasted Barley", category: "British", lovibond: "500", gravity: 1.025, description: "Dry, roasted flavor, amber color.  For stouts, porters and Scottish ales." },
  { id: 53, name: "Toasted Pale Malt", category: "British", lovibond: "25", gravity: 1.038, description: "Imparts nutty flavor and aroma.  Use in IPAs and Scottish ales." },
  { id: 54, name: "Wheat Malt", category: "British", lovibond: "2", gravity: 1.038, description: "Light flavor, creamy head. For wheat beers, stouts, doppelbocks and alt beers." },
  { id: 55, name: "Torrified Wheat", category: "British", lovibond: "1-1.5", gravity: 1.036, description: "Puffed wheat created by high heat. Use in pale ales, bitters and milds." },
  { id: 56, name: "Acidulated (Sauer) Malt", category: "German", lovibond: "1.7-2.8", gravity: 1.033, description: "High lactic acid. For lambics, sour mash beers, Irish stout, pilsners and wheats." },
  { id: 57, name: "Carafa I", category: "German", lovibond: "300-340", gravity: 1.038, description: "Gives deep  aroma  and color to dark beers, bocks, stout, alt and schwarzbier." },
  { id: 58, name: "Carafa II", category: "German", lovibond: "375-450", gravity: 1.038, description: "Carafa I, II and III also are available de-husked. Adds aroma, color and body." },
  { id: 59, name: "Carafa III", category: "German", lovibond: "490-560", gravity: 1.038, description: "" },
  { id: 60, name: "Chocolate Wheat Malt", category: "German", lovibond: "375-450", gravity: 1.038, description: "Intensifies aroma;  improves color. For dark ales, alt, dark wheat, stout and porter." },
  { id: 61, name: "Chocolate Rye Malt", category: "German", lovibond: "190-300", gravity: 1.030, description: "Enhances aroma of dark ales and improves color. For dunkel rye wheat and ale." },
  { id: 62, name: "CaraHell Malt (light crystal)", category: "German", lovibond: "8-12", gravity: 1.033, description: "For light colored beer for body; hefeweizen, pale ale, golden ale, Oktoberfest." },
  { id: 63, name: "CaraMunich Malt I", category: "German", lovibond: "30-38", gravity: 1.033, description: "Provides body. For Oktoberfest, bock, porter, stout, red, amber and brown ales." },
  { id: 64, name: "CaraMunich Malt II", category: "German", lovibond: "42-50", gravity: 1.033, description: "CaraMunich Malt III is dark crystal." },
  { id: 65, name: "CaraMunich Malt III", category: "German", lovibond: "53-60", gravity: 1.033, description: "" },
  { id: 66, name: "Light Munich Malt", category: "German", lovibond: "5-6", gravity: 1.034, description: "For a desired malty, nutty flavor.  Lagers, Oktoberfests and bock beer." },
  { id: 67, name: "Dark Munich Malt", category: "German", lovibond: "8-10", gravity: 1.034, description: "Enhances body and aroma.  Stout, schwarzbier, brown ale, dark and amber ales." },
  { id: 68, name: "Melanoidin Malt", category: "German", lovibond: "23-31", gravity: 1.033, description: "For amber lagers and ales, dark lagers and ales, Scottish & red ales." },
  { id: 69, name: "Rauch Smoked Malt", category: "German", lovibond: "2-4", gravity: 1.037, description: "For rauchbier, kellerbier, smoked porters, Scottish ales and barleywines." },
  { id: 70, name: "Rye Malt", category: "German", lovibond: "2.8-4.3", gravity: 1.029, description: "Dry character. Can use as a base malt. For seasonal beers, roggenbier and ales." },
  { id: 71, name: "Wheat Malt Light", category: "German", lovibond: "1.5-2", gravity: 1.039, description: "Typical top fermented aroma, produces superb wheat beers." },
  { id: 72, name: "Wheat Malt Dark", category: "German", lovibond: "6-8", gravity: 1.039, description: "" },
  { id: 73, name: "Caramel Wheat Malt", category: "German", lovibond: "38-53", gravity: 1.035, description: "For dark ales, hefeweizen, dunkelweizen, wheat bocks and double bocks." },
  { id: 74, name: "Belgian Candi Sugar (clear)", category: "Sugars", lovibond: "0.5", gravity: 1.036, description: "Smooth taste, good head retention, sweet aroma and high gravity without being apparent. Use in Belgian and holiday ales. Use clear for tripels, amber for dubbels, and dark is used in brown beer and strong golden ales." },
  { id: 75, name: "Candi Sugar (amber)", category: "Sugars", lovibond: "75", gravity: 1.036, description: "Smooth taste, good head retention, sweet aroma and high gravity without being apparent. Use in Belgian and holiday ales. Use clear for tripels, amber for dubbels, and dark is used in brown beer and strong golden ales." },
  { id: 76, name: "Candi Sugar (dark)", category: "Sugars", lovibond: "275", gravity: 1.036, description: "Smooth taste, good head retention, sweet aroma and high gravity without being apparent. Use in Belgian and holiday ales. Use clear for tripels, amber for dubbels, and dark is used in brown beer and strong golden ales." },
  { id: 77, name: "Brown Sugar", category: "Sugars", lovibond: "40", gravity: 1.046, description: "Imparts rich, sweet flavor. Use in Scottish ales, old ales and holiday beers." },
  { id: 78, name: "Dark Brown Sugar", category: "Sugars", lovibond: "60", gravity: 1.046, description: "Imparts rich, sweet flavor. Use in Scottish ales, old ales and holiday beers." },
  { id: 79, name: "Corn Sugar", category: "Sugars", lovibond: "1", gravity: 1.037, description: "Use in priming beer or in extract recipes where flaked maize would be used in a mash." },
  { id: 80, name: "Demerara Sugar", category: "Sugars", lovibond: "1", gravity: 1.041, description: "Imparts mellow, sweet flavor. Use in English ales." },
  { id: 81, name: "Dextrose (glucose)", category: "Sugars", lovibond: "1", gravity: 1.037, description: "Imparts a mild sweet taste and smoothness. Use in English beers." },
  { id: 82, name: "Dry Malt Extract", category: "Sugars", lovibond: "Varie", gravity: 1.044, description: "Extra light (2.5°), Light (3.5°), Amber (10°), Dark (30°), Wheat (3°)" },
  { id: 83, name: "Honey", category: "Sugars", lovibond: "Varie", gravity: 1.032, description: "Imparts sweet and dry taste. For honey and brown ales. Also: specialty ales." },
  { id: 84, name: "Invert Sugar", category: "Sugars", lovibond: "NA", gravity: 1.046, description: "Increases alcohol.  Use in some Belgian or English ales. Use as an adjunct for priming. Made from sucrose. No dextrins. Use 1 cup for priming." },
  { id: 85, name: "Lactose", category: "Sugars", lovibond: "NA", gravity: 1.043, description: "Adds sweetness and body. Use in sweet or milk stouts." },
  //{ id: 86, name: "Licorice Stick", category: "Sugars", lovibond: "NA", gravity: NA, description: "Adds a smooth flavor to stouts, porters, holiday ales and flavored beers." },
  { id: 87, name: "Lyle's Golden Syrup", category: "Sugars", lovibond: "0", gravity: 1.036, description: "Adds a smooth flavor to stouts, porters, holiday ales and flavored beers." },
  { id: 88, name: "Maple Syrup", category: "Sugars", lovibond: "35", gravity: 1.030, description: "Imparts a dry, woodsy flavor if used in the boil. If beer is bottled with it, it gives it a smooth sweet, maple taste. Use in maple ales, pale ales, brown ales and porters." },
  { id: 89, name: "Maple Sap", category: "Sugars", lovibond: "3", gravity: 1.009, description: "Crisp dry, earthy flavor. Use in pale ales, porters and maple ales." },
  { id: 90, name: "Molasses", category: "Sugars", lovibond: "80", gravity: 1.036, description: "Imparts strong sweet flavor. Use in stouts and porters." },
  { id: 91, name: "Rice Solids", category: "Sugars", lovibond: "0.01", gravity: 1.040, description: "Lightens flavor without taste. Use in American and Asian lagers." },
  { id: 92, name: "Sucrose (white table sugar)", category: "Sugars", lovibond: "NA", gravity: 1.046, description: "Increases alcohol. Use in Australian lagers and English bitters." },
  { id: 93, name: "Syrup Malt Extract", category: "Sugars", lovibond: "Varie", gravity: 1.033, description: "Extra Light (3.5°), Light (3.5 -5°), Amber (10°), Dark (30°), Wheat (2°)." },
  { id: 94, name: "Treacle", category: "Sugars", lovibond: "100", gravity: 1.036, description: "Imparts intense, sweet flavor. A British mixture of molasses, invert sugar and golden syrup (corn syrup). Use in dark English ales." },
].map(g => _.assignIn(g, { weight: { unit: Pound, value: 1 }}));

export default GrainLookup;