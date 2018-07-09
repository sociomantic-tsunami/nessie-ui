import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName }                  from '../utils';

const Page = ( {
    children,
    cssMap,
    className,
    overflow
} ) =>

    <div className = { buildClassName( className, cssMap, { overflow } ) }>
        { children }
    </div>;

Page.propTypes =
{
    /**
     *  Page content
     */
    children : PropTypes.node,

    /**
     * Page overflow setting
     *
     */
    overflow : PropTypes.oneOf( [
        'auto',
        'hidden',
        'visible',
        'scroll',
        'scrollX',
        'scrollY'
    ] ),
};

Page.defaultProps =
{
    cssMap : require( './page.css' ),
    scroll : 'auto'
};

export default Page;
