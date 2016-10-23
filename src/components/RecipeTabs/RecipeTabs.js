import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeTabs.css';
import GrainBillContainer from '../../containers/GrainBill';
import GrainSearchContainer from '../../containers/GrainSearch';
import GrainChart from '../../containers/GrainChart';
import HopScheduleContainer from '../../containers/HopSchedule';
import HopChart from '../../containers/HopChart';
import HopSearchContainer from '../../containers/HopSearch';
import MashScheduleContainer from '../../containers/MashSchedule';
import FermentationContainer from '../../containers/Fermentation';
import YeastSearchContainer from '../../containers/YeastSearch';
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
        <div className="pure-g">
          <div className="pure-u-1-2">
            <GrainBillContainer />
          </div>
          <div className="pure-u-1-2">
            <GrainSearchContainer />
            <div className={s.grainChart}>
              <GrainChart />
            </div>
          </div>
        </div>
      </Tab>
      <Tab className={s.recipeTab} label="Hops">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <HopScheduleContainer />
          </div>
          <div className="pure-u-1-2">
            <HopSearchContainer />
            <div className={s.hopChart}>
              {recipe.hops.length ? <HopChart /> : ''}
            </div>
          </div>
        </div>
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