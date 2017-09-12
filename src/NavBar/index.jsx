import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavList              from '..//NavList';

export default class NavBar extends Component
{
    static propTypes =
    {
        /**
         *  Navigation bar content (NavItems)
         */
        children : PropTypes.node,
    };

    static defaultProps =
    {
        cssMap : require( './navBar.css' )
    };

    render()
    {
        const { children, className, cssMap } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <nav className = { className }>
                    <NavList className = { cssMap.list }>
                        { children }
                    </NavList>
                </nav>
            </Css>
        );
    }
}
