import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Page = ( {
    children,
    cssMap,
    className,
    overflow } ) =>
        <Css
            cssMap = { cssMap }
            cssProps = { { overflow } } >
            <div className = { className }>
                { children }
            </div>
        </Css>;

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
