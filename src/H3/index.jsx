import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H3 = ( {
    cssMap,
    className,
    children,
    spacing,
    role,
    title }
) =>

    <Css
        cssMap   = { cssMap }
        cssProps = { { role,
            spacing } }>
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
    ] ),
    /**
     *  Height of the H1 margin-bottom
     */
    spacing : PropTypes.oneOf( [
        'S',
        'M',
        'L'
    ] )
};

H3.defaultProps =
{
    role    : 'default',
    spacing : 'L',
    cssMap  : require( './h3.css' )
};


export default H3;
