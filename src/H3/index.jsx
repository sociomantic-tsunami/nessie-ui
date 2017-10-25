import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H3 = ( {
    cssMap,
    className,
    children,
    variant,
    title } ) =>

    <Css
        cssMap   = { cssMap }
        cssProps = { { variant } }>
        <h3 className = { className }>
            { children || title }
        </h3>
    </Css>;

H3.propTypes =
{
    /**
    *  Title text
    */
    title   : PropTypes.string,
    /**
    *  variant (style) to apply to heading
    */
    variant : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical'
    ] )
};

H3.defaultProps =
{
    variant : 'default',
    cssMap  : require( './h3.css' )
};


export default H3;
