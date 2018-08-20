import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './dropdown.css';


const Dropdown = ( {
    children,
    className,
    cssMap,
    hasError,
    padding,
    size,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            error : hasError,
            padding,
            size,
        } ) }>
        { children }
    </div>
);

Dropdown.propTypes = {
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    hasError  : PropTypes.bool,
    padding   : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    size      : PropTypes.oneOf( [ 'content', 'default' ] ),
};

Dropdown.defaultProps = {
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    hasError  : false,
    padding   : 'none',
    size      : 'default',
};

export default Dropdown;
