import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const NavList = ( { children, className, cssMap, layout } ) =>
{
    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { layout } }>
            <ul className = { className }>
                { children }
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
