import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';

const isNavItem = node => React.isValidElement( node )
    && node.type.name === 'NavItem';

const filterNavItems = node => React.Children.toArray( node )
    .filter( isNavItem );

export default class NavDropdown extends Component
{
    static propTypes =
    {
        /**
         *  Dropdown content (NavItems)
         */
        children : PropTypes.node,
    };

    static defaultProps =
    {
        cssMap : require( './navDropdown.css' )
    };

    render()
    {
        const { children, className, cssMap } = this.props;

        const dropdownItems = filterNavItems( children ).map( child =>
        React.cloneElement( child, { ...child.props, role: 'sub' } ) );

        return (
            <Css cssMap = { cssMap }>
                <NavList layout = "vertical" className = { className }>
                    { dropdownItems }
                </NavList>
            </Css>
        );
    }
}
