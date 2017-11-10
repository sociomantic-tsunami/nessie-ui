import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './scrollBox.css';

const createScrollHandler = func =>
    func && ( e =>
    {
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        func( e, scrollTop / ( scrollHeight - clientHeight ) );
    } );

const ScrollBox = ( {
    className,
    cssMap,
    children,
    height,
    onScroll,
    scroll
} ) => (
    <div
        className = { buildClassName( className, cssMap, { scroll } ) }
        onScroll  = { createScrollHandler( onScroll ) }
        style     = { { maxHeight: height ? `${height}` : null } }>
        { children }
    </div>
);

ScrollBox.propTypes =
{
    /**
     *  ScrollBox content
     */
    children : PropTypes.node,
    /**
     *  ScrollBox height, specified in rem units
     */
    height   : PropTypes.number,
    /**
     *  on scroll callback function
     */
    onScroll : PropTypes.func,
    /**
     *  Scroll direction
     */
    scroll   : PropTypes.oneOf( [ 'horizontal', 'vertical', 'both' ] )

};

ScrollBox.defaultProps =
{
    children : undefined,
    cssMap   : styles,
    height   : undefined,
    onScroll : undefined,
    scroll   : 'both',
};

export default ScrollBox;
