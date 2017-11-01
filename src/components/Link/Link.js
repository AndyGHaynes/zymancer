/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import history from '../../core/history';
import { SelectedRoute } from '../../constants/AppConstants';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func
  };

  handleClick = (event) => {
    let allowTransition = true;

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      if (this.props.to) {
        history.push(this.props.to);
      } else {
        history.push({
          pathname: event.currentTarget.pathname,
          search: event.currentTarget.search
        });
      }
    }
  };

  render() {
    const { to, navlink, ...props } = this.props; // eslint-disable-line no-use-before-define
    const currentPath = history.getCurrentLocation().pathname.split('/')[1];
    const active = navlink && SelectedRoute[to].some(r => r === currentPath);
    return <a data-active={active} href={history.createHref(to)} {...props} onClick={this.handleClick} />;
  }

}

export default Link;
