import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './text.css';

const Text = ( {
    allCaps,
    cssMap,
    className,
    children,
    noWrap,
    overflowIsHidden,
    role,
    size,
    letterSpacing,
    text,
    textAlign,
    color,
    textRef,
    variant,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            allCaps,
            overflowHidden : overflowIsHidden,
            noWrap,
            role,
            size,
            textAlign,
            variant,
        } ) }
        style = { { letterSpacing, color } }
        ref = { textRef }>
        { children || text }
    </div>
);

Text.propTypes =
{
    /**
     *  Capitalize text
     */
    allCaps          : PropTypes.bool,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Don’t wrap text to the next line
    */
    noWrap           : PropTypes.bool,
    /**
     *  Clip overflow
     */
    overflowIsHidden : PropTypes.bool,
    /**
    *  Role (style) to apply to text
    */
    role             : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical',
    ] ),
    /**
    *  Size to apply to text
    */
    size : PropTypes.oneOf( [
        'XXXL',
        'XXL',
        'XL',
        'L',
        'M',
        'S',
        'XS',
        'XXS',
    ] ),
    /**
    * Letter Spacing for the text
    */
    letterSpacing : PropTypes.string,
    /**
    *  Text string
    */
    text          : PropTypes.string,
    /**
    * Text Align
    */
    textAlign     : PropTypes.oneOf( [
        'left',
        'center',
        'right',
    ] ),
    /**
    *  Text Color
    */
    color   : PropTypes.string,
    /**
    *  callback that receives ref to the text div: ref => ...
    */
    textRef : PropTypes.func,
    /**
    *  Style to apply to text
    */
    variant : PropTypes.oneOf( [
        'Light',
        'Regular',
        'RegularIt',
        'SemiBold',
        'Bold',
        'ExtraBold',
    ] ),
};

Text.defaultProps =
{
    allCaps          : false,
    cssMap           : styles,
    noWrap           : false,
    overflowIsHidden : false,
    role             : 'default',
    size             : 'M',
    letterSpacing    : '0',
    textAlign        : 'left',
    variant          : 'Regular',
};

export default Text;
