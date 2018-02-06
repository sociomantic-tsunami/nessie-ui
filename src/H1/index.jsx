import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H1 = ( {
    cssMap,
    className,
    children,
    spacing,
    title,
    role }
) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { role,
            spacing } }>
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

H1.defaultProps =
{
    role    : 'default',
    spacing : 'L',
    cssMap  : require( './h1.css' )
};

export default H1;
