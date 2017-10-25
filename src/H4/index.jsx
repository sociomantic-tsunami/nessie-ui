import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H4 = ( {
    cssMap,
    className,
    children,
    variant,
    title } ) =>

    <Css
        cssMap   = { cssMap }
        cssProps = { { variant } }>
        <h4 className = { className }>
            { children || title }
        </h4>
    </Css>;

H4.propTypes =
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

H4.defaultProps =
{
    variant : 'default',
    cssMap  : require( './h4.css' )
};

export default H4;
