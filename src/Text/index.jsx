import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Text = ( {
    cssMap,
    className,
    children,
    noWrap,
    overflowIsHidden,
    role,
    text }
) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { {
            role,
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
    text : PropTypes.string
};

Text.defaultProps =
{
    noWrap           : false,
    overflowIsHidden : false,
    role             : 'default',
    cssMap           : require( './text.css' )
};

export default Text;
