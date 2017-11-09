import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const isNavItem = node => React.isValidElement( node )
    && node.type.name === 'NavItem';

const filterNavItems = node => React.Children.toArray( node )
    .filter( isNavItem );

const NavList = ( { children, className, cssMap, layout } ) =>
{
    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { layout } }>
            <ul className = { className }>
                { filterNavItems( children ) }
            </ul>
        </Css>
    );
};

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
