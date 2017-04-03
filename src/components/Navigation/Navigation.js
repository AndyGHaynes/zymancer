/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation({ authenticated }) {
  const accountLink = authenticated ? (
      <span>
        <a className={s.link} href="/logout">Log out</a>
      </span>
  ) : (<Link navlink className={s.link} to="/login">Log in</Link>);

  return (
    <div className={s.root} role="navigation">
      <Link navlink className={s.link} to="/">Calculator</Link>
      <span className={s.spacer}>|</span>
      <Link navlink className={s.link} to="/recipes">Recipes</Link>
      <span className={s.spacer}>|</span>
      <Link navlink className={s.link} to="/parser">Parser</Link>
      <span className={s.spacer}>|</span>
      {accountLink}
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
  authenticated: PropTypes.bool
};

export default withStyles(s)(Navigation);
