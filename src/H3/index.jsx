import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './h3.css';

const H3 = ( {
    cssMap,
    className,
    children,
    title,
    role,
} ) => (
    <h3 className = { buildClassName( className, cssMap, { role } ) }>
        { children || title }
    </h3>
);

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
        'critical',
    ] ),
};

H3.defaultProps =
{
    title  : undefined,
    role   : 'default',
    cssMap : styles,
};

export default H3;
