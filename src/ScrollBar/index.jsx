import React                            from 'react';
import PropTypes                        from 'prop-types';

import { buildClassName, generateId }   from '../utils';
import styles                           from './scrollbar.css';


const ScrollBar = ( {
    className,
    cssMap,
    id,
    orientation,
    onChange,
    onMouseOut,
    onMouseOver,
    thumbSize,
    scrollPos,
    scrollMax,
    scrollMin,
    width
} ) =>
    (
        <div
            className    = { buildClassName( className, cssMap, { orientation } ) }
            id           = { id }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut } >
            <input
                className    = { cssMap.range }
                value        = { scrollPos }
                max          = { scrollMax }
                min          = { scrollMin }
                onChange     = { e => onChange( parseInt( e.target.value ) ) }
                step         = "1"
                style        = { { width: `${width}px`, '--thumbSize': `${thumbSize}%` } }
                type         = "range" />
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
     *  orientation of the scrollBox 'horizontal || vertical'
     */
    orientation : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  onChange callback function : ( e ) => { ... }
     */
    onChange    : PropTypes.func,
    /**
     *  onInput callback function : ( e ) => { ... }
     */
    onInput     : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  Callback ref DOM
     */
    ref         : PropTypes.func,
    /**
     *  Scroll thumb/indicator width/height
     */
    thumbSize   : PropTypes.number,
    /**
     *  Scroll Top/Left value
     */
    scrollPos   : PropTypes.number,
    /**
     *  Max value of the ScrollBar
     */
    scrollMax   : PropTypes.number,
    /**
     *  Min value of the ScrollBar
     */
    scrollMin   : PropTypes.number,
    /**
     *  width of the scrollBar track
     */
    width       : PropTypes.number,
};

ScrollBar.defaultProps =
{
    className   : undefined,
    cssMap      : styles,
    id          : generateId( 'ScrollBox' ),
    orientation : 'vertical',
    onChange    : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    thumbSize   : 50,
    scrollPos   : 0,
    scrollMax   : undefined,
    scrollMin   : 0,
    value       : 0,
    width       : undefined
};

export default ScrollBar;
