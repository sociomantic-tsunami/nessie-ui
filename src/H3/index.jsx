import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H3 = ( {
    cssMap,
    className,
    children,
    role,
    title } ) =>

        <Css
            cssMap   = { cssMap }
            cssProps = { { role } }>
            <h3 className = { className }>
                { children || title }
            </h3>
        </Css>;

H3.propTypes =
{
    /**
    *  Title text
    */
    title : PropTypes.string,
    /**
    *  Role (style) to apply to heading
    */
    role  : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical'
    ] )
};

H3.defaultProps =
{
    role   : 'default',
    cssMap : require( './h3.css' )
};


export default H3;
