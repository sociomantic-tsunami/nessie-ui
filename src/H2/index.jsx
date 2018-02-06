import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H2 = ( {
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
        <h2 className = { className }>
            { children || title }
        </h2>
    </Css>;

H2.propTypes =
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

H2.defaultProps =
{
    role    : 'default',
    spacing : 'L',
    cssMap  : require( './h2.css' )
};


export default H2;
