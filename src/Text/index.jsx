import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './text.css';

const Text = ( {
    cssMap,
    className,
    children,
    noWrap,
    overflowIsHidden,
    role,
    text,
    textRef,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            overflowHidden : overflowIsHidden,
            noWrap,
            role,
        } ) }
        ref = { textRef }>
        { children || text }
    </div>
);

Text.propTypes =
{
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
    *  Text string
    */
    text    : PropTypes.string,
    /**
    *  callback that receives ref to the text div: ref => ...
    */
    textRef : PropTypes.func,
};

Text.defaultProps =
{
    cssMap           : styles,
    noWrap           : false,
    overflowIsHidden : false,
    role             : 'default',
};

export default Text;
