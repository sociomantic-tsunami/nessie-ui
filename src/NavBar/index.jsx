/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import NavList              from '..//NavList';

const NavBar = ( { children, className, cssMap } ) =>

    <nav className = { buildClassName( className, cssMap ) }>
        <NavList>
            { children }
        </NavList>
    </nav>;

NavBar.propTypes =
{
    /**
     *  Navigation bar content (NavItems)
     */
    children : PropTypes.node,
};

NavBar.defaultProps =
{
    cssMap : require( './navBar.css' ),
};

export default NavBar;
