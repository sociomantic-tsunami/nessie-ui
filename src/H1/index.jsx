import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H1 = ( { cssMap, className, children, title, variant } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { variant } }>
        <h1 className = { className }>
            { children || title }
        </h1>
    </Css>;

H1.propTypes =
{
    /**
    *  Title text
    */
    title : PropTypes.string,
    /**
    *  variant (style) to apply to heading
    */
    variant  : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical'
    ] )
};

H1.defaultProps =
{
    variant : 'default',
    cssMap : require( './h1.css' )
};

export default H1;
