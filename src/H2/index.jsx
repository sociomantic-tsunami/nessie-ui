import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './h2.css';

const H2 = ( {
    cssMap,
    className,
    children,
    title,
    role,
} ) => (
    <h2 className = { buildClassName( className, cssMap, { role } ) }>
        { children || title }
    </h2>
);

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
        'critical',
    ] ),
};

H2.defaultProps =
{
    title  : undefined,
    role   : 'default',
    cssMap : styles,
};

export default H2;
