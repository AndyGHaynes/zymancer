/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import Header from '../Header';
import MobileHeader from '../_mobile/Header';
import Footer from '../Footer';
import { Provider } from 'react-redux';
import actions from '../../actions';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }

    const store = this.props.context.store;
    const state = store.getState();
    const authenticated = state.auth.authenticated;
    const isMobile = state.isMobile;

    return (
      <Provider store={store}>
        <div>
          {!isMobile && <Header authenticated={authenticated} />}
          {isMobile && <MobileHeader
            authenticated={authenticated}
            selectMobileTab={(tab) => store.dispatch(actions.recipe.selectMobileTab(tab))}
          />}
          {this.props.children}
        </div>
      </Provider>
    );
  }

}

export default App;
