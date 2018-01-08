import React                    from 'react';
import PropTypes                from 'prop-types';

import { buildClassName }       from '../utils';
import styles                   from './scrollBox.css';
import { createScrollHandler }  from './utils';

const ScrollBox = ( {
    cssMap,
    children,
    className,
    contentWidth,
    height,
    onScroll,
    scroll,
    scrollBoxRef,
} ) =>
    <div
        className = { buildClassName( className, cssMap, { scroll } ) }
        onScroll  = { createScrollHandler( onScroll ) }
        ref       = { scrollBoxRef }
        style     = { { maxHeight: height ? `${height}` : null } }>
        <div
            className = { cssMap.content }
            style     = { { width: contentWidth } }>
            { children }
        </div>
    </div>;

ScrollBox.propTypes =
{
    /**
     *  ScrollBox content
     */
    children     : PropTypes.node,
    /**
     *  ScrollBox content width
     */
    contentWidth : PropTypes.string,
    /**
     *  ScrollBox height
     */
    height       : PropTypes.string,
    /**
     *  on scroll callback function
     */
    onScroll     : PropTypes.func,
    /**
     *  Scroll direction
     */
    scroll       : PropTypes.oneOf( [ 'horizontal', 'vertical', 'both' ] ),
    /**
     *  Callback that receives scrollable div: ( ref ) => { ... }
     */
    scrollBoxRef : PropTypes.func,

};

ScrollBox.defaultProps =
{
    children     : undefined,
    cssMap       : styles,
    height       : undefined,
    onScroll     : undefined,
    scroll       : 'both',
    scrollBoxRef : undefined,
};

export default ScrollBox;
