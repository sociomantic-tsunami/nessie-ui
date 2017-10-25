import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './inputFrame.css';


const InputFrame = ( {
    children,
    className,
    cssMap,
    hasError,
    isActive,
    isDisabled
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            active   : isActive,
            disabled : isDisabled,
            error    : hasError,
        } ) }>
        { children }
    </div>
);

InputFrame.propTypes = {
    /**
     *  Contents of the frame
     */
    children   : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className  : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display as error
     */
    hasError   : PropTypes.bool,
    /**
     *  Display as active
     */
    isActive   : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
};

InputFrame.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    hasError   : false,
    isActive   : false,
    isDisabled : false,
};

export default InputFrame;
