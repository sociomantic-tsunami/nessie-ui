import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';

const NavBar = ( { children, className, cssMap } ) =>
    <Css cssMap = { cssMap }>
        <nav className = { className }>
            <NavList className = { cssMap.list }>
                { children }
            </NavList>
        </nav>
    </Css>;

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
