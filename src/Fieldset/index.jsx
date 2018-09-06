/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';
import PropTypes from 'prop-types';

import {
    buildClassName,
    createEventHandler,
    generateId,
} from '../utils';
import Label           from '../Label';
import IconWithTooltip from '../IconWithTooltip';
import styles          from './fieldset.css';

const Fieldset = ( {
    children,
    className,
    cssMap,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    hasError,
    id = generateId( 'Fieldset' ),
    isDisabled,
    label,
    onMouseOut,
    onMouseOver,
} ) => (
    <fieldset
        className   = { buildClassName( className, cssMap ) }
        onMouseOut  = { createEventHandler( onMouseOut, { id } ) }
        onMouseOver = { createEventHandler( onMouseOver, { id } ) }>
        { label &&
            <IconWithTooltip
                className     = { cssMap.labelContainer }
                iconIsVisible = { !isDisabled && !!errorMessage &&
                    hasError
                }
                iconPosition     = "right"
                iconType         = "error"
                message          = { errorMessage }
                tooltipIsVisible = { errorMessageIsVisible }
                tooltipPosition  = { errorMessagePosition }>
                <Label element = "legend">{ label }</Label>
            </IconWithTooltip>
        }
        { children }
    </fieldset>
);

Fieldset.propTypes =
{
    /**
     *  Fieldset label string or JSX node
     */
    label                 : PropTypes.node,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
    *  Display as disabled
    */
    isDisabled            : PropTypes.bool,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Fieldset content (usually Checkboxes or Radios)
     */
    children              : PropTypes.node,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver           : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut            : PropTypes.func,

    /**
    *  Error message position relative to the icon
    */
    errorMessagePosition : PropTypes.oneOf( [
        'left',
        'right',
        'top',
        'bottom',
        'topLeft',
        'topRight',
    ] ),
};

Fieldset.defaultProps =
{
    cssMap                : styles,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    hasError              : false,
};

export default Fieldset;
