import React                              from 'react';
import PropTypes                          from 'prop-types';

import { buildClassName }                 from '../utils';


const NavList = ( {
    children, className, cssMap, layout
} ) => (
    <ul className = { buildClassName( className, cssMap, { layout } ) }>
        { children }
    </ul>
);

NavList.propTypes =
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

NavList.defaultProps =
{
    layout : 'horizontal',
    cssMap : require( './navList.css' )
};

export default NavList;
