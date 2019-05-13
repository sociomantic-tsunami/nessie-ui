/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { forwardRef }             from 'react';
import PropTypes                         from 'prop-types';

import { Icon }                          from '..';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'IconButton';

const killFocus = e => e.preventDefault();

const IconButton = forwardRef( ( props, ref ) =>
{
    const {
        children,
        iconSize,
        iconType,
        id,
        isDisabled,
        isFocusable,
        label,
        style,
        iconStyle,
        value,
    } = props;

    const cssMap = useThemeClasses( componentName, props );

    return (
        <button
            { ...attachEvents( props, {
                onClick : { value },
            } ) }
            className   = { cssMap.main }
            disabled    = { isDisabled }
            id          = { id }
            onMouseDown = { !isFocusable ? killFocus : undefined }
            ref         = { ref }
            style       = { style }
            tabIndex    = { isFocusable ? '0' : '-1' }
            type        = "button"
            value       = { value }>
            <Icon
                className  = { cssMap.icon }
                isDisabled = { isDisabled }
                size       = { iconSize }
                style      = { iconStyle }
                type       = { iconType }>
                { children || label }
            </Icon>
        </button>
    );
} );

IconButton.propTypes =
{
    /**
     *  extra CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label text (overrides label prop)
     */
    children      : PropTypes.string,
    /**
     * Adds a background to the icon
     */
    hasBackground : PropTypes.bool,
    /**
     *  Icon size to display
     */
    iconSize      : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
    /**
     *  Icon type to display (see https://feathericons.com/)
     */
    iconType      : PropTypes.string,
    /**
     * Component id
     */
    id            : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled    : PropTypes.bool,
    /**
     *  Button is focusable
     */
    isFocusable   : PropTypes.bool,
    /**
     *  Label text
     */
    label         : PropTypes.string,
    /**
     *  Button click callback function: ( e ) => { ... }
     */
    onClick       : PropTypes.func,
    /**
     *  HTML value attribute
     */
    role          : PropTypes.oneOf( [ 'default', 'inverted' ] ),
    /**
     *  HTML value attribute
     */
    value         : PropTypes.string,
    /**
     *  Style overrides
     */
    style         : PropTypes.objectOf( PropTypes.string ),
    /**
     *  SVG tyle overrides
     */
    iconStyle     : PropTypes.objectOf( PropTypes.string ),
};

IconButton.defaultProps =
{
    children      : undefined,
    className     : undefined,
    cssMap        : undefined,
    hasBackground : false,
    iconSize      : 'S',
    iconType      : undefined,
    id            : undefined,
    isDisabled    : false,
    isFocusable   : true,
    label         : undefined,
    onClick       : undefined,
    role          : 'default',
    style         : undefined,
    iconStyle     : undefined,
    value         : undefined,
};

IconButton.displayName = componentName;

export default IconButton;
