import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H2 = ( {
    cssMap,
    className,
    children,
    variant,
    title } ) =>

    <Css
        cssMap   = { cssMap }
        cssProps = { { variant } }>
        <h2 className = { className }>
            { children || title }
        </h2>
    </Css>;

H2.propTypes =
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

H2.defaultProps =
{
    variant : 'default',
    cssMap  : require( './h2.css' )
};


export default H2;
