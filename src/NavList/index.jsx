import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';


const warnNavItems = ( node ) =>
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
        console.warn( 'NavList children should be \
NavItems and not other elements' );
    }

    return _node;
};

const NavList = ( { children, className, cssMap, layout } ) =>
{
    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { layout } }>
            <ul className = { className }>
                { warnNavItems( children ) }
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
