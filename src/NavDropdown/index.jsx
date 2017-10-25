import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';

const isNavItem = node => React.isValidElement( node )
    && node.type.name === 'NavItem';

const filterNavItems = node => React.Children.toArray( node )
    .filter( isNavItem );

const NavDropdown = ( { children, className, cssMap } ) =>
{
    const dropdownItems = filterNavItems( children ).map( child =>
        React.cloneElement( child, { ...child.props, variant: 'sub' } ) );

    return (
        <Css cssMap = { cssMap }>
            <NavList layout = "vertical" className = { className }>
                { dropdownItems }
            </NavList>
        </Css>
    );
};

NavDropdown.propTypes =
{
    /**
     *  Dropdown content (NavItems)
     */
    children : PropTypes.node,
};

NavDropdown.defaultProps =
{
    cssMap : require( './navDropdown.css' )
};

export default NavDropdown;
