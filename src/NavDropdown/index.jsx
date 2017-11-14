import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';


const filterNavItems = ( node ) =>
{
    const _node = React.Children.toArray( node );
    let warning = false;

    _node.forEach( child =>
    {
        if ( !( React.isValidElement( child )
        && child.type.name === 'NavItem' ) )
        {
            warning = true;
        }
    } );

    if ( warning )
    {
        console.warn( 'NavDropdown should be \
provided with Navitems and not other elements' );
    }

    return _node;
};

const NavDropdown = ( { children, className, cssMap } ) =>
{
    const dropdownItems = filterNavItems( children ).map( child =>
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
