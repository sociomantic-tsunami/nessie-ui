import React, { Children } from 'react';
import PropTypes           from 'prop-types';

import { buildClassName }  from '../utils';
import NavList             from '../NavList';
import styles              from './navDropdown.css';

const NavDropdown = ( { children, className, cssMap } ) =>
{
    const items = Children.toArray( children ).map( child =>
        React.cloneElement( child, { ...child.props, role: 'sub' } ) );

    return (
        <NavList
            className = { buildClassName( className, cssMap ) }
            layout    = "vertical">
            { items }
        </NavList>
    );
};

NavDropdown.propTypes =
{
    /**
     *  Dropdown content (NavItems)
     */
    children  : PropTypes.node,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
};

NavDropdown.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : styles,
};

export default NavDropdown;
