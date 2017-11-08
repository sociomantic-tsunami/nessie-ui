import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const ScrollBox = ( { cssMap, children, height, scroll } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { scroll } }>
        <div style = { { maxHeight: height ? `${height}rem` : null } }>
            { children }
        </div>
    </Css>;

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
     *  Scroll direction
     */
    scroll   : PropTypes.oneOf( [ 'horizontal', 'vertical', 'both' ] )

};

ScrollBox.defaultProps =
{
    scroll : 'both',
    cssMap : require( './scrollBox.css' )
};

export default ScrollBox;
