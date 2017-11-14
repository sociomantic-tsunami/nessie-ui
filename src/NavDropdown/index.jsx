import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';


const NavDropdown = ( { children, className, cssMap } ) =>
{
    const dropdownItems = React.Children.toArray( children ).map( child =>
    React.cloneElement( child, { ...child.props, role: 'sub' } ) );

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
