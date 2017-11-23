import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H4 = ( {
    cssMap,
    className,
    children,
    role,
    title } ) =>

        <Css
            cssMap   = { cssMap }
            cssProps = { { role } }>
            <h4 className = { className }>
                { children || title }
            </h4>
        </Css>;

H4.propTypes =
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

H4.defaultProps =
{
    role   : 'default',
    cssMap : require( './h4.css' )
};

export default H4;
