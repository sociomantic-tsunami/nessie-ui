import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Text = ( {
    cssMap,
    className,
    children,
    noWrap,
    overflowIsHidden,
    variant,
    text } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { {
            variant,
            overflowHidden : overflowIsHidden,
            noWrap
        } }>
        <div className = { className }>
            { children || text }
        </div>
    </Css>;
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
    *  variant (style) to apply to text
    */
    variant          : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical'
    ] ),
    /**
    *  Text string
    */
    text : PropTypes.string
};

Text.defaultProps =
{
    noWrap           : false,
    overflowIsHidden : false,
    variant          : 'default',
    cssMap           : require( './text.css' )
};

export default Text;
