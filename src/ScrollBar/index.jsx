import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import styles                         from './scrollBar.css';


const ScrollBar = ( {
    className,
    cssMap,
    id = generateId( 'ScrollBar' ),
    length,
    onChange,
    onMouseOut,
    onMouseOver,
    orientation,
    scrollMax,
    scrollMin,
    scrollPos,
    thumbSize,
} ) => (
    <div
        className    = { buildClassName( className, cssMap, { orientation } ) }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }
        style        = { {
            '--thumbSize'   : thumbSize,
            '--trackLength' : length,
        } }>
        <input
            className    = { cssMap.range }
            id           = { id }
            max          = { scrollMax }
            min          = { scrollMin }
            onChange     = { e =>
                onChange && onChange( parseInt( e.target.value, 10 ) )
            }
            step  = "1"
            type  = "range"
            value = { scrollPos } />
    </div>
);

ScrollBar.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className   : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Component id
     */
    id          : PropTypes.string,
    /**
     *  Length of the track (CSS unit)
     */
    length      : PropTypes.string,
    /**
     *  Orientation of the scroll bar
     */
    orientation : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  onChange callback function : ( e ) => { ... }
     */
    onChange    : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  Max scroll value
     */
    scrollMax   : PropTypes.number,
    /**
     *  Min scroll value
     */
    scrollMin   : PropTypes.number,
    /**
     *  Scroll position
     */
    scrollPos   : PropTypes.number,
    /**
     *  Scroll thumb size (CSS unit)
     */
    thumbSize   : PropTypes.string,
};

ScrollBar.defaultProps =
{
    className   : undefined,
    cssMap      : styles,
    id          : undefined,
    length      : '100%',
    onChange    : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    orientation : 'horizontal',
    scrollMax   : undefined,
    scrollMin   : 0,
    scrollPos   : 0,
    thumbSize   : undefined,
};

export default ScrollBar;
