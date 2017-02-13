import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import GrainBillContainer from '../../containers/GrainBill';
import HopScheduleContainer from '../../containers/HopSchedule';
import MashScheduleContainer from '../../containers/MashSchedule';
import FermentationContainer from '../../containers/Fermentation';
import StyleContainer from '../../containers/Style';
import RecipeHeader from '../RecipeHeader';
import MobileRecipeHeader from '../_mobile/RecipeHeader';
import MobileRecipeTabs from '../_mobile/RecipeTabs';
import { BrewMethod } from '../../constants/AppConstants';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const RecipeTabs = ({ recipe, authenticated, actions, isMobile }) => (
  <div className={s.recipeTabs}>
    {!isMobile && <RecipeHeader {...{ recipe, authenticated, actions }} />}
    {!isMobile && <Tabs>
      <Tab className={s.recipeTab} label="Grains">
        <GrainBillContainer />
      </Tab>
      <Tab className={s.recipeTab} label="Hops">
        <HopScheduleContainer />
      </Tab>
      <Tab className={s.recipeTab} label="Mash" disabled={recipe.method === BrewMethod.BIAB}>
        <MashScheduleContainer />
      </Tab>
      <Tab className={s.recipeTab} label="Fermentation">
        <FermentationContainer />
      </Tab>
      <Tab className={s.recipeTab} label="Style">
        <StyleContainer />
      </Tab>
    </Tabs>}
    {isMobile && <MobileRecipeHeader {...{ recipe, authenticated, actions }} />}
    {isMobile && <MobileRecipeTabs {...{ recipe, actions }} />}
  </div>
);

export default withStyles(s)(RecipeTabs);