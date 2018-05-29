import React                            from 'react';
import PropTypes                        from 'prop-types';

import { buildClassName, generateId }   from '../utils';
import styles                           from './scrollbar.css';


const ScrollBar = ( {
    children,
    className,
    cssMap,
    defaultValue,
    id,
    orientation,
    onChange,
    onInput,
    onMouseOut,
    onMouseOver,
    ref,
    thumbSize,
    scrollPos,
    scrollMax,
    scrollMin
} ) =>
    (
        <div
            className    = { buildClassName( className, cssMap, { orientation } ) }
            id           = { id }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut } >
            <input
                value        = { scrollPos }
                max          = { scrollMax }
                min          = { scrollMin }
                onChange     = { e => onChange( parseInt( e.target.value ) ) }
                onInput      = { onInput }
                ref          = { ref }
                style        = { thumbSize }
                type         = "range" />
            { children }
        </div>
    );

ScrollBar.propTypes =
{
    /**
     *  ScrollBar content (if any)
     */
    children     : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Default value
     */
    defaultValue : PropTypes.number,
    /**
    *  Component id
    */
    id           : PropTypes.string,
    /**
     *  orientation of the scrollBox 'horizontal || vertical'
     */
    orientation  : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  onChange callback function : ( e ) => { ... }
     */
    onChange     : PropTypes.func,
    /**
     *  onInput callback function : ( e ) => { ... }
     */
    onInput      : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut   : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver  : PropTypes.func,
    /**
     *  Callback ref DOM
     */
    ref          : PropTypes.func,
    /**
     *  Scroll thumb/indicator width/height
     */
    thumbSize    : PropTypes.number,
    /**
     *  Scroll Top/Left value
     */
    scrollPos    : PropTypes.number,
    /**
     *  Max value of the ScrollBar
     */
    scrollMax    : PropTypes.number,
    /**
     *  Min value of the ScrollBar
     */
    scrollMin    : PropTypes.number,
};

ScrollBar.defaultProps =
{
    children    : undefined,
    className   : undefined,
    cssMap      : styles,
    id          : generateId( 'ScrollBox' ),
    orientation : undefined,
    onChange    : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    thumbSize   : undefined,
    scrollPos   : undefined,
    scrollMax   : undefined,
    scrollMin   : undefined
};

export default ScrollBar;
