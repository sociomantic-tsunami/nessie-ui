import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './dropdown.css';


const Dropdown = ( {
    children,
    className,
    cssMap,
    hasError,
    hasPadding,
    size
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            error   : hasError,
            padding : hasPadding,
            size,
        } ) }>
        { children }
    </div>
);

Dropdown.propTypes = {
    children   : PropTypes.node,
    className  : PropTypes.string,
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    hasError   : PropTypes.bool,
    hasPadding : PropTypes.bool,
    size       : PropTypes.oneOf( [ 'content', 'default' ] ),
};

Dropdown.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    hasError   : false,
    hasPadding : false,
    size       : 'default',
};

export default Dropdown;
