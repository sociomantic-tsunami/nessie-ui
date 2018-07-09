import React                from 'react';
import PropTypes            from 'prop-types';

                  


const NavList = ( { children, className, cssMap, layout } ) => (
    <Css
        cssMap   = { cssMap }
        cssProps = { { layout } }>
        <ul className = { className }>
            { children }
        </ul>
    </Css>
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
