import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GrainSearchOption from '../GrainSearchOption';
import s from './GrainSearch.css';
import IngredientSearch from '../IngredientSearch';

class GrainSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { search, configuration, actions } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
        create={actions.addIngredient}
        header={(
          <div className="pure-g">
            <div className="pure-u-15-24">
              Name
            </div>
            <div className="pure-u-6-24">
              Maltster
            </div>
            <div className="pure-u-3-24">
              Color
            </div>
          </div>
        )}
      >
        {search.results.map(grain => (
          <GrainSearchOption
            key={grain.id}
            addGrain={() => actions.addIngredient(grain, configuration)}
            grain={grain}
          />
        ))}
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(GrainSearch);
