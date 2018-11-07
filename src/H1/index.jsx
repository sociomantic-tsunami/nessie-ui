import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './h1.css';

const H1 = ( {
    cssMap,
    className,
    children,
    title,
    role,
} ) => (
    <h1 className = { buildClassName( className, cssMap, { role } ) }>
        { children || title }
    </h1>
);

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
        'critical',
    ] ),
};

H1.defaultProps =
{
    title  : undefined,
    role   : 'default',
    cssMap : styles,
};

export default H1;
