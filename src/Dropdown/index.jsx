import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './dropdown.css';


const Dropdown = ( { children, className, cssMap, hasError } ) => (
    <div
        className = { buildClassName( className, cssMap,
            { error: hasError } ) }>
        { children }
    </div>
);

Dropdown.propTypes = {
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    hasError  : PropTypes.bool,
};

Dropdown.defaultProps = {
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    hasError  : false,
};

export default Dropdown;
