import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Required = ( {
    children,
    className,
    cssMap,
    isRequired,
    text } ) =>

    ( <Css
        cssMap   = { cssMap }
        cssProps = { { required: isRequired } }>
        <span className = { className }>
            { children || text }
        </span>
    </Css> );

Required.propTypes =
{
    /**
    *  Text to show
    */
    text       : PropTypes.string,
    /**
    *  Show as required
    */
    isRequired : PropTypes.bool
};

Required.defaultProps =
{
    isRequired : true,
    cssMap     : require( './required.css' )
};

export default Required;
