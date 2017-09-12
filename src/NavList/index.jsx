import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const isNavItem = node => React.isValidElement( node )
    && node.type.name === 'NavItem';

const filterNavItems = node => React.Children.toArray( node )
    .filter( isNavItem );

export default class NavList extends Component
{
    static propTypes =
    {
        /**
         *  List content (NavItems)
         */
        children : PropTypes.node,
        /**
         *  How to lay out the list items
         */
        layout   : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    };

    static defaultProps =
    {
        layout : 'horizontal',
        cssMap : require( './navList.css' )
    };

    render()
    {
        const { children, className, cssMap, layout } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { layout } }>
                <ul className = { className }>
                    { filterNavItems( children ) }
                </ul>
            </Css>
        );
    }
}
