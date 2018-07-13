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
    spacing,
    style,
    text,
    textColor,
    textRef
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            allCaps,
            overflowHidden : overflowIsHidden,
            noWrap,
            role,
            size,
            style
        } ) }
        style = { { letterSpacing: spacing, color: `#${textColor}` } }
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
        'critical'
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
        'XXS'
    ] ),
    /**
    *  Style to apply to text
    */
    style : PropTypes.oneOf( [
        'Light',
        'Regular',
        'RegularIt',
        'SemiBold',
        'Bold',
        'ExtraBold'
    ] ),
    /**
    * Letter Spacing for the text
    */
    spacing   : PropTypes.string,
    /**
    *  Text string
    */
    text      : PropTypes.string,
    /**
    *  Text Color
    */
    textColor : PropTypes.string,
    /**
    *  callback that receives ref to the text div: ref => ...
    */
    textRef   : PropTypes.func
};

Text.defaultProps =
{
    allCaps          : false,
    cssMap           : styles,
    noWrap           : false,
    overflowIsHidden : false,
    role             : 'default',
    size             : 'M',
    spacing          : '0',
    style            : 'Regular'
};

export default Text;
