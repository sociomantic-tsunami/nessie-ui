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
    cssMap : require( './navBar.css' )
};

export default NavBar;
