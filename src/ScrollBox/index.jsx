import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const ScrollBox = ( { cssMap, children, contentWidth, height, scroll } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { scroll } }>
        <div style = { { maxHeight: height ? `${height}rem` : null } }>
            <div
                className = { cssMap.content }
                style =
                    { { width: contentWidth ? `${contentWidth}%` : null  } }>
                { children }
            </div>
        </div>
    </Css>;

ScrollBox.propTypes =
{
    /**
     *  ScrollBox content
     */
    children     : PropTypes.node,
    /**
     *  ScrollBox content width, , specified in rem %
     */
    contentWidth : PropTypes.number,
    /**
     *  ScrollBox height, specified in rem units
     */
    height       : PropTypes.number,
    /**
     *  Scroll direction
     */
    scroll       : PropTypes.oneOf( [ 'horizontal', 'vertical', 'both' ] )

};

ScrollBox.defaultProps =
{
    scroll : 'both',
    cssMap : require( './scrollBox.css' )
};

export default ScrollBox;
