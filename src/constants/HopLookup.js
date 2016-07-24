const HopLookup = [
  { id: 0, name:"Equinox", description:"Typical alpha: 14.4-15.6% A pronounced aroma profile with citrus, tropical fruit, floral and herbal characteristics. Specific descriptors include lemon, lime, papaya, apple, and green pepper. The diversified and pronounced aroma characteristics combined with extremely high oil content and a tight cone structure make this hop variety unique. Typical Beer Styles - IPA, Imperial IPA, Pale Ale, ESB  Possible Substitutions: Cascade, Centennial, Simcoe", alpha:"14.4-15.6%"},
  { id: 1, name:"Mosaic", description:"Typical alpha acid: 11.5-13.5% Brewers have noted that Mosaic is a 'complexity of flavors' providing a 'powerful combination punch of pine and fruit.' Specific descriptors include earthy, grassy, herbal, citrus, cedar, floral, pine, tropical, onion/garlic, spice and stone fruit.    Typical Beer Styles - Pale Ale, IPA, Imperial IPA, pretty much any hop forward style of beer.", alpha:"11.5-13.5%"},
  { id: 2, name:"Falconer's Flight", description:"Typical Alpha: 10.5% Falconer’s Flight™ is an exclusive proprietary hop blend created by Hop Union to honor and support the legacy of Northwest brewing legend, Glen Hay Falconer, who passed in 2002. The blend is comprised of many of the Northwest’s most unique hop varieties, including Citra™, Simcoe®, and Sorachi Ace along with experimental hops and numerous other NW varieties. Perfect for any Northwest-style IPA. Each hop has been hand selected for its superior aromatic qualities, imparting distinct tropical, citrus, floral, lemon and grapefruit tones.", alpha:"10.5%"},
  { id: 3, name:"Ahtanum", description:"Typical alpha: 7.0-9.0% Relatively new variety with citrus zest, grapefruit, and some earthy floral notes. Try it in recipes calling for cascade hops.  Possible Substitutions: Amarillo, Cascade", alpha:"7.0-9.0%"},
  { id: 4, name:"Summit", description:"Typical alpha: 17.0-19.0% Citrus and tangerine aroma with a distinct earthy, onion/garlic flavor. Can be used as bittering or finishing additions. Typical Beer Styles - IPA, Imperial IPA, Pale Ale.  Possible Substitutions: Columbus, Simcoe, Warrior", alpha:"17.0-19.0%"},
  { id: 5, name:"US Brewer's Gold Pellets", description:"Typical alpha: 8.5-9.5% Blackcurrant and spicy flavor with a touch of mint.  Mainly a bittering hop but could be interesting as a flavoring addition in Belgian ales. Typical Beer Styles - Ale, Pilsner, Lambic, Saison, Biere de Garde.", alpha:"8.5-9.5%"},
  { id: 6, name:"Australian Helga", description:"Typical Alpha: 4.9-6.3% Produced exclusively in Tasmania, Helga (also known as Southern Hallertau) is a great aroma hop.  Very similar to Hallertau Mittelfrueh.  Possible Substitutions: Hallertau", alpha:"4.9-6.3%"},
  { id: 7, name:"Australian Pride of Ringwood", description:"Typical Alpha: 9-10.5% Imparts a unique flavor to beer. Very well regarded in Australia and has been commercially grown since the 60's. Extensively used for early and late additions.", alpha:"9-10.5%"},
  { id: 8, name:"Citra", description:"Typical alpha: 10-14% A fruity aroma hop with hints of citrus,  peach, apricot, passion fruit, grapefruit, lime, melon, gooseberry, lychee fruit, pineapple, mango, &amp; papaya, and  other tropical fruits. Typically used in American Ales and IPAs.  Possible Substitutions: Simcoe", alpha:"10-14%"},
  { id: 9, name:"Australian Stella", description:"Typical Alpha: 14-16% A new hop variety with hoppy and floral notes. Hints of anise. Reminiscent of noble European hop varieties.", alpha:"14-16%"},
  { id: 10, name:"Australian Super Pride", description:"Typical Alpha: 13.5-15% Bred from Pride of Ringwood, Super Pride features similar mild aromas. Excellent bittering qualities.", alpha:"13.5-15%"},
  { id: 11, name:"Australian Topaz", description:"Typical Alpha: 15.5-18% High alpha hop with a similar character to English varities when used as a flavoring addition. When used for later additions, fruit flavors such as lychee can be detected.", alpha:"15.5-18%"},
  { id: 12, name:"Glacier", description:"Typical Alpha: 5-9% Dual purpose hop with a pleasant aroma of citrus mixed with sweet fruity pear or apricot. Typical brewing styles: Pale Ales, ESB, English-Style Pale Ale, Porter, &amp; Stout  Possible Substitutions: Fuggle, Willamette, Styrian Golding", alpha:"5-9%"},
  { id: 13, name:"New Zealand Green Bullet", description:"Typical Alpha: 12-15% This bittering hop is known to have a unique characteristic. With some similarities to Styrian Golding, you should pick up a slight raisin and fruit quality. Use for many styles of beer including American IPA's and Lager's.  Possible Substitutions: Fuggle, Willamette", alpha:"12-15%"},
  { id: 14, name:"New Zealand Hallertau", description:"Typical alpha: 6.5 - 8.5 % A dual purpose hop descended from Hallertau Mittlefrüh.  Aroma is floral with notes of lime zest. Typical Beer Styles - Lager, Pilsner, Bitter, Ales, Bock.", alpha:"6.5 - 8.5 %"},
  { id: 15, name:"New Zealand Motueka", description:"Typical alpha: 6.5-7.5% Descended from Saaz with some noble characteristics and a bright citrus overtone.  Possible Substitutions: Saaz, Sterling", alpha:"6.5-7.5%"},
  { id: 16, name:"New Zealand Nelson Sauvin", description:"Typical Alpha: 12-13% This dual purpose hop is often described as 'breathtaking'. Nelson Sauvin has the ability to impart a distinct fruitness very similar to white wine. It is gaining quite the reputation in America. Can be used for many styles, from pale ales to lagers.", alpha:"12-13%"},
  { id: 17, name:"UK Kent Goldings", description:"Typical alpha: 4.0-5.5% The quintessential English aroma variety.  Sweet and spicy with a delicate floral bouquet. Typical Beer Styles - English and Belgian Style Ales, ESB, Bitter, Porter.  Possible Substitutions: US Golding", alpha:"4.0-5.5%"},
  { id: 18, name:"German Opal", description:"Typical alpha: 5-8% Floral and fruity hop character with medium bittering potential. Typical Beer Styles - Summer Ales, Light Ale, Belgian Style Ales, Wheat.  Possible Substitutions: Tettnanger, Kent Golding, Styrian Golding", alpha:"5-8%"},
  { id: 19, name:"German Smaragd", description:"Typical alpha: 4-6% Relatively new hop variety with floral and fruity notes.  Subdued citrus with hints of lemon and orange marmalade.  German response to popular American hops like Simcoe and Amarillo.", alpha:"4-6%"},
  { id: 20, name:"Mt. Rainier", description:"Typical alpha: 6-8% Similar in character to hallertau with hints of flowers, spice, citrus, and licorice.  Possible Substitutions: Brewer's Gold, Hallertau, Fuggle", alpha:"6-8%"},
  { id: 21, name:"US Northern Brewer", description:"Typical alpha 8-10% Woody and minty bittering hop, used exclusively in classic California Commons. Typical Beer Styles - English Ales, American Ales, Kölsch, Porter, Munich Helles, California Common.  Possible Substitutions:  Chinook, Galena", alpha:"0"},
  { id: 22, name:"New Zealand Pacific Jade", description:"Typical alpha: 12-14% Bright citrus with hints of black pepper.", alpha:"12-14%"},
  { id: 23, name:"German Perle", description:"Typical alpha: 6.5-9.0% Predominately floral with smooth bitterness.  Possible Substitutions: Northern Brewer", alpha:"6.5-9.0%"},
  { id: 24, name:"US Saaz", description:"Typical alpha: 3.0-4.5% US version of the classic Czech noble hop.  Similar in character with spicy and herbal flavors. Typical Beer Styles - Pilsner, Lager, Wheat, Belgian Style Ales.  Possible Substitutions: Sterling", alpha:"3.0-4.5%"},
  { id: 25, name:"Simcoe", description:"Typical alpha acid: 12-14% Pine and tropical fruit flavor/aroma. Great as a flavor and dry hop but because of a low cohumulone content, Simcoe makes for a clean, smooth bittering hop.  Typical Beer Styles - Pale Ale, IPA, Imperial IPA, pretty much any hop forward style of beer.  Possible Substitutions: Magnum, Summit", alpha:"12-14%"},
  { id: 26, name:"Santiam", description:"Typical alpha: 5.5-7.0% Noble hop profile with spicy and herbal notes. Typical Beer Styles - Lager, Pilsner, Belgian Tripel, Munich Helles, Kölsch, Bock.  Possible Substitutions: Tettnanger", alpha:"5.5-7.0%"},
  { id: 27, name:"US Tettnanger", description:"Typical alpha: 3.5% - 5.3% Aroma hop with a mild and pleasant, slightly spicy aroma. Typical Brewing Styles:  Lager, Ales, Pilsner, Weizen, Lambic, Alt, Kölsch, &amp; Munich Helles.  Possible Substitutions: Fuggle, Santiam", alpha:"3.5% - 5.3%"},
  { id: 28, name:"Warrior", description:"Typical alpha: 14.0-16.0%.  Super-high alpha hop with low cohumulone.  Intense bittering hop with a subdued spicy citrus flavor. Use in most American hoppy ales.  Possible Substitutions: Columbus, Magnum, Nugget", alpha:"14.0-16.0%"},
  { id: 29, name:"Zythos", description:"Typical alpha: 10.0-11.9% Much like Falconer's Flight™, Zythos is a proprietary hop blend of several unique Northwest hop varieties. Zythos is blended for optimum aroma characteristics great bittering properties  to compliment your IPAs and Pale Ale brews. Expect tangerine, citrus and pine  from this hop blend.", alpha:"10.0-11.9%"},
  { id: 30, name:"German Magnum", description:"Typical alpha: 13-15% Very clean bittering hop with almost no aroma.    Possible Substitutions: Columbus, Nugget", alpha:"13-15%"},
  { id: 31, name:"Millennium", description:"Typical alpha: 14.5-16.5% Mild and resinous with floral and herbal tones. This descendent of Nugget closely resembles Nugget and Columbus, and is typically used as a bittering hop. Typical Beer Styles - Stout, IPA  Possible Substitutions: Columbus, Nugget, Summit", alpha:"14.5-16.5%"},
  { id: 32, name:"Bramling Cross Pellet", description:"Typical alpha: 5.0-7.0% Interesting fruity blackcurrant flavor with a touch of lemon.", alpha:"5.0-7.0%"},
  { id: 33, name:"UK Challenger", description:"Typical alpha acid: 5-9% Dual purpose hop with a delicate aroma and a spicy fresh pine scent. Typical brewing use - English style Ale, Porter, Stout, ESB, Bitter, Barley Wine, Brown Ales  Possible Substitutions: Northern Brewer, German Perle", alpha:"5-9%"},
  { id: 34, name:"German Northern Brewer", description:"Typical alpha 8-10% Renowned for its versatile minty and herbal bittering qualities.  Possible Substitutions: Chinook, Columbus, Galena, Magnum, Northern Brewer, Brewer's Gold", alpha:"0"},
  { id: 35, name:"Styrian Golding (Celeia)", description:"Typical alpha: 3.0-6.0% Resembles Fuggle in character, with a pleasant spicy aroma. Typical Beer Styles - English and Belgian Style Ales, Lagers, Pilsners.   Possible Substitutions: Fuggle", alpha:"3.0-6.0%"},
  { id: 36, name:"Mt. Hood", description:"Typical alpha: 4.0-7.0% Considered one of the 'noble' US varieties.  Descended from hallertau with floral and sweet spicy aromas. Typical Beer Styles - Lager, Pilsner, Bock, Wheat, Alt, Munich Helles.  Possible Substitutions: French Strisselspalt, Hallertau", alpha:"4.0-7.0%"},
  { id: 37, name:"Australian Galaxy", description:"Typical Alpha: 12-14% Similar to Citra with notes of passionfruit and citrus. Great hop for finishing and bittering. Highly recommended for a single hop beer.  Possible Substitutions: Citra", alpha:"12-14%"},
  { id: 38, name:"Amarillo", description:"Typical alpha: 6.0-9.0% A unique hop with tropical fruit and citrus aromas and flavors.  Typical Beer Styles - IPA, Imperial IPA, Pale Ale.  Possible Substitutions: Cascade, Centennial, Simcoe", alpha:"6.0-9.0%"},
  { id: 39, name:"Azacca", description:"Typical alpha: 14% - 15% Fresh citrus with piney notes and a full tropical fruit flavor. Typical Brewing Styles:  Pale Ales, IPA's.", alpha:"14% - 15%"},
  { id: 40, name:"Buzz Bullets", description:"Typical alpha: 12% - 18% Citrus and floral notes Typical Brewing Styles:  Pale Ales, IPA's.", alpha:"12% - 18%"},
  { id: 41, name:"Belma™", description:"Typical alpha: 12-13% Brand NEW hop variety!! Very clean hop with notes of tropical fruit, orange, strawberry and melon. Dual purpose. Typical Beer Styles - IPA, Imperial IPA, Pale Ale.", alpha:"12-13%"},
  { id: 42, name:"Caliente", description:"Typical alpha: 15% - 18% Fresh peach and plum notes with hints of cherries and lemon. Typical Brewing Styles:  Pale Ales, IPA's.", alpha:"15% - 18%"},
  { id: 43, name:"Chinook", description:"Typical alpha: 11.0-13.0% Mainly a bittering hop but can be very interesting in small quantities as an aroma or dry-hop addition. Medium intensity spicy, piney, and distinctive grapefruit aroma. Typical brewing use - US Style Pale Ale, IPA, Stout, Barley Wine, Lager  Possible Substitutions: Columbus, Northern Brewer, Nugget", alpha:"11.0-13.0%"},
  { id: 44, name:"Columbus", description:"Typical alpha: 14.0-16.0% Mainly a bittering hop. Intense &amp; pungent, citrusy punchy and bold. Dank. Typical brewing Styles - US IPA, US Pale Ale, Stout, Barley Wine, Lager (bittering)  Possible Substitutions: Chinook, Galena, Nugget", alpha:"14.0-16.0%"},
  { id: 45, name:"Calypso", description:"Alpha Acid 12.0 - 14.3% Dual purpose hop with a complex, fruity &amp; citrusy aroma.  Hints of pear and apple, lemon lime, and earthy tea notes. Typical Brewing Styles: Ales, Stouts and Barley Wines.", alpha:"12"},
  { id: 46, name:"Cluster", description:"Typical alpha: 5 - 8% Dual purpose hop used mostly for bittering with a floral and spicy aroma. Typical brewing use - Ale (aroma), Lager (bittering), Stout  Possible Substitutions: Galena", alpha:"5 - 8%"},
  { id: 47, name:"Centennial", description:"Typical alpha: 9.0-12.0% Classic American bittering and aroma hop with strong citrus and grapefruit flavors as well as piney resinous notes.  Possible Substitutions: Cascade, Chinook, Columbus, Centennial Type", alpha:"9.0-12.0%"},
  { id: 48, name:"Cascade", description:"Alpha Acid  5.5 - 7.2% The quintessential American hop variety with a smooth flowery and citrusy grapefruit aroma. Typical brewing styles - American-Style Ales, Pale Ale, IPA, Porter, &amp; Barley wines.  Possible Substitutions: Ahtanum, Amarillo, Centennial", alpha:"0"},
  { id: 49, name:"Crystal", description:"Typical alpha: 2.0-4.5% Aroma hop that is mild and pleasant, a delicate blend of spices and flowers. Typical brewing styles: Pilsner, Lager, Kölsch, ESB, Alt, Belgian-Style Ales   Possible Substitutions: Hallertau, Liberty, Mt. Hood, French Strisselspalt", alpha:"2.0-4.5%"},
  { id: 50, name:"French Strisselspalt", description:"Typical alpha: 2.0-3.5% Classic mild noble aroma with a slight blackcurrant flavor.   Possible Substitutions: Crystal, Liberty, Mt. Hood", alpha:"2.0-3.5%"},
  { id: 51, name:"German Hallertau Blanc", description:"Typical alpha: 9-12% Newly released by Hüll. Great for aroma and flavoring. A very exquisite and complex profile. Said to be very white wine like. Expect notes of cassis, elderflower, grapes, grapefruit, lemongrass, passionfruit, pineapple &amp; gooseberry.", alpha:"9-12%"},
  { id: 52, name:"German Mandarina Bavaria", description:"Typical alpha: 8.5-10.5% Newly released by Hüll. Great for aroma and flavoring. Expect citrusy flavors like tangerine.  Possible Substitutions: Columbus, Nugget, Cascade", alpha:"8.5-10.5%"},
  { id: 53, name:"Galena", description:"Typical Alpha: 10-14% Dual purpose hop with a citrusy aroma. Typical brewing styles - English-style and American Ales  Possible Substitutions: Brewer's Gold, Columbus, Nugget", alpha:"10-14%"},
  { id: 55, name:"Horizon", description:"Typical alpha: 11-13% Clean bittering with a subtle flowery citrus aroma.  Typical Beer Styles - Ales and Lagers  Possible Substitutions: Magnum", alpha:"11-13%"},
  { id: 56, name:"Bravo", description:"Typical Alpha: 14-17% High alpha bittering hop with pleasant fruity and floral aroma characteristics.  Possible Substitutions: Columbus, Magnum, Nugget", alpha:"14-17%"},
  { id: 57, name:"German Hallertau", description:"Typical alpha: 3.0-5.0% Classic noble hop with a floral, spicy and herbal aroma.  Perfect for many German ales and lagers.  Possible Substitutions: Liberty, Mt. Hood", alpha:"3.0-5.0%"},
  { id: 58, name:"Aged/Debittered Kent Goldings", description:"Typical alpha: NA Aged hops ideal for lambics. Does not add bitterness to a beer.", alpha:"0"},
  { id: 60, name:"Lemon Drop", description:"Typical alpha: 5% - 7% Aroma hop with notes of lemon, grapefruit, citrus, blackberry, menthol, pine, licorice &amp; peppermint. Typical Brewing Styles:  Pale Ales, IPA's.  Possible Substitutions: Fuggle, Santiam", alpha:"5% - 7%"},
  { id: 61, name:"Liberty", description:"Typical alpha: 3.0-5.0% Considered one of the 'noble' US varieties.  Similar to Hallertau with mild sweet and spicy flavors. Typical Beer Styles - Lager, Pilsner, Bock, Wheat, Kölsch.  Possible Substitutions: Hallertau, Mt. Hood", alpha:"3.0-5.0%"},
  { id: 62, name:"Nugget", description:"Typical alpha: 9.0-11.0% Popular American bittering hop that is very versatile. Somewhat clean with a pleasant herbal flavor. Typical Beer Styles - IPA, Ale, Stout, Barley Wine.  Columbus, Galena, Magnum", alpha:"9.0-11.0%"},
  { id: 63, name:"New Zealand Pacific Gem", description:"Typical Alpha: 13-15% High alpha hop with a fruity aroma of melon with bright floral notes.  Possible Substitutions: Galena", alpha:"13-15%"},
  { id: 64, name:"NZ Waimea", description:"Typical alpha: 16% - 19% Intense tangelo and citrus fruits with subtle pine notes. Typical Brewing Styles:  Pale Ales, IPA's.", alpha:"16% - 19%"},
  { id: 65, name:"UK Fuggle", description:"Typical alpha acid: 3-5% Aroma hop with a mild, soft, pleasant, spicy, woody, mushroomy and earthy  aroma. Typical Beer Styles - All English-style Ales, ESB, Bitter, Lager, &amp; Lambic.  Possible Substitutions: Fuggle, Willamette, Styrian Golding", alpha:"3-5%"},
  { id: 66, name:"US Fuggle", description:"Typical alpha: 3-5% Mild, woody, slight fruity pleasant aroma. Typical brewing use - Any English-style beer or American Ales, Lambic  Possible Substitutions: Willamette, Styrian Golding", alpha:"3-5%"},
  { id: 67, name:"New Zealand Pacifica", description:"Typical Alpha: 4.8-5.2% Pacifica offers the classic citrus and floral aroma of its Hallertau parent, with hints of orange marmalade. The desirable oil profile promises good flavor integration with a variety of beer styles. Used as a bittering hop, Pacifica produces a soft yet solid finish, even in highly bittered beers. Great in German Lagers and American Pale Ales.", alpha:"4.8-5.2%"},
  { id: 68, name:"Pine Fruit (Experimental)", description:"Typical alpha: 18% - 19% Strong herbal notes with currant and dark fruits. Typical Brewing Styles:  Pale Ales, IPA's.  Possible Substitutions: Fuggle, Santiam", alpha:"18% - 19%"},
  { id: 69, name:"Palisade", description:"Typical alpha: 5.5-9.5% Earthy, floral, fruity, and berry flavors and aromas. Typical Beer Styles - American and English ales.  Possible Substitutions: Willamette", alpha:"5.5-9.5%"},
  { id: 70, name:"US Perle", description:"Typical alpha: 7-9.5% Spicy, herbal and floral with smooth bittering qualities.  Possible Substitutions: Northern Brewer", alpha:"7-9.5%"},
  { id: 71, name:"New Zealand Rakau", description:"Typical Alpha: 10-13% Rakau is truly a dual-purpose hop. Its high alpha acid content delivers a soft bitterness, while it also offers tropical aromas of passionfruit and peach. Rakau is versatile and performs well in a wide range of styles, but it's especially recommended for use in hop-forward beers like American Pale Ales and IPAs.", alpha:"10-13%"},
  { id: 72, name:"Sorachi Ace", description:"Typical alpha acid: 10-16% High alpha hop with interesting lemon, lemongrass, and dill flavors. Typical Beer Styles - IPA, Pale Ale, Belgian Wit, Belgian Saison.", alpha:"10-16%"},
  { id: 73, name:"Saphir", description:"Alpha Acid  2-4.5% Distinct aroma with a flower and fruit tones. Typical Beer Styles - German Lagers, Pilsners, Belgian Style Ales, Wheat Beers.  Possible Substitutions: Possible Substitutions:", alpha:"0"},
  { id: 74, name:"Czech Saaz", description:"Typical alpha: 3.0-4.5% Classic spicy, herbal, and floral noble hop profile. Essential for Bohemian Pilsners.  Possible Substitutions: Sterling", alpha:"3.0-4.5%"},
  { id: 75, name:"UK Target", description:"Typical alpha: 9.5-12.5% Grassy and herbal, pleasant English hop aroma, quite intense. Typical Beer Styles - All Ales and Lagers.  Possible Substitutions: Fuggle, Willamette", alpha:"9.5-12.5%"},
  { id: 76, name:"German Tettnanger", description:"Typical alpha: 3.5%-6% Classic noble hop variety with spicy mild floral aroma.  Typical Beer Styles - Lager, Ale, Pilsner, Weizen, Lambic, Alt, Kölsch, Munich Helles, Belgian Style Ales.  Possible Substitutions: Czech Saaz", alpha:"3.5%-6%"},
  { id: 77, name:"UK Boadicea", description:"Typical Alpha: 6 - 7% Spicy &amp; Floral dual purpose hop hailing from the UK.  Possible Substitutions: Green Bullet, Cascade, Columbus or Chinook", alpha:"6 - 7%"},
  { id: 78, name:"US Golding", description:"Typical Alpha: 4-6% American grown version of the classic East kent Golding hop.  Mild and floral. Typical Beer Styles - English styles, Barley Wine, Pale Ale, Belgian style Ales.  Possible Substitutions: Fuggle, Willamette, UK Kent Golding, Styrian Golding", alpha:"4-6%"},
  { id: 79, name:"US Hallertau", description:"Typical alpha: 3.0-5.0% Aroma hop with a mild, clean  spicy floral scent. Typical brewing styles - Lager, Pilsner, Bock, Kölsch, Munich Helles, Belgian-Style Ales  Possible Substitutions: Liberty, Mt. Hood, German Magnum", alpha:"3.0-5.0%"},
  { id: 80, name:"US Magnum", description:"Typical alpha: 13-15% US grown. Very clean bittering hop with almost no aroma.   Typical Beer Styles - Ales and Lagers.  Possible Substitutions: Columbus, Horizon, Nugget, German Magnum", alpha:"13-15%"},
  { id: 82, name:"New Zealand Wakatu", description:"Typical Alpha: 5-8% Wakatu is a descendant of Hallertau Mittelfrüh with a unique, southern hemisphere flair of floral and lime notes. This dual-purpose hops lends itself to so use in many styles of beer whether lager or ale. Wakatu was formerly called 'Hallertau Aroma'.", alpha:"5-8%"},
  { id: 83, name:"Willamette", description:"Typical alpha: 4-6% Character is similar to Fuggle, but is more fruity and has some floral notes. Typical Beer Styles - English and American ales.   Possible Substitutions: Fuggle, Glacier, Tettnanger, Styrian Golding", alpha:"4-6%"},
];

export default HopLookup;