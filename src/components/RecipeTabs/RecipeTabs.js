import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import GrainBillContainer from '../../containers/GrainBill';
import HopScheduleContainer from '../../containers/HopSchedule';
import MashScheduleContainer from '../../containers/MashSchedule';
import FermentationContainer from '../../containers/Fermentation';
import RecipeHeader from '../RecipeHeader';
import { BrewMethod } from '../../constants/AppConstants';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

const RecipeTabs = ({ recipe, actions }) => (
  <div className={s.recipeTabs}>
    <RecipeHeader
      recipe={recipe}
      actions={actions}
    />
    <Tabs>
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
    </Tabs>
  </div>
);

export default withStyles(s)(RecipeTabs);