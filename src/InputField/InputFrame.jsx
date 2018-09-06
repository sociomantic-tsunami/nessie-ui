/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './inputFrame.css';


const InputFrame = ( {
    children,
    className,
    cssMap,
    hasError,
    forceHover,
    isDisabled,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            fakeHovered : forceHover,
            disabled    : isDisabled,
            error       : hasError,
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
     *  Display as active
     */
    forceHover : PropTypes.bool,
    /**
     *  Display as error
     */
    hasError   : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
};

InputFrame.defaultProps = {
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    forceHover : false,
    hasError   : false,
    isDisabled : false,
};

export default InputFrame;
