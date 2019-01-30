/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Icon }                     from '..';

import { attachEvents, generateId } from '../utils';
import { useTheme }                 from '../Theming';

const componentName = 'IconButton';

const killFocus = e => e.preventDefault();

const IconButton = props =>
{
    const {
        buttonRef,
        children,
        iconSize,
        iconType,
        id = generateId( 'IconButton' ),
        isDisabled,
        isFocusable,
        label,
        value,
    } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <button
            { ...attachEvents( props, {
                onClick : { value },
            } ) }
            className   = { cssMap.main }
            disabled    = { isDisabled }
            id          = { id }
            onMouseDown = { !isFocusable ? killFocus : undefined }
            ref         = { buttonRef }
            tabIndex    = { isFocusable ? '0' : '-1' }
            type        = "button"
            value       = { value }>
            <Icon
                className  = { cssMap.icon }
                isDisabled = { isDisabled }
                size       = { iconSize }
                type       = { iconType }>
                { children || label }
            </Icon>
        </button>
    );
};

IconButton.propTypes =
{
    /**
     * Callback that receives a ref to the <button>: ( ref ) => { ... }
     */
    buttonRef     : PropTypes.func,
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
     * Display as hover when required from another component
     */
    forceHover    : PropTypes.bool,
    /**
     * Adds a background to the icon
     */
    hasBackground : PropTypes.bool,
    /**
     *  Icon size to display
     */
    iconSize      : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
    /**
     *  Icon type to display
     */
    iconType      : PropTypes.oneOf( [
        'account',
        'add-circle',
        'add',
        'alert',
        'approved',
        'arrow-down',
        'arrow-up',
        'arrow',
        'bell',
        'board',
        'calendar',
        'close-circle',
        'close-thick',
        'close',
        'dash',
        'dashboard',
        'deactivated',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit-circle',
        'edit',
        'ended',
        'error',
        'file',
        'graph',
        'hide',
        'info',
        'inspect',
        'left',
        'lightbulb',
        'link',
        'loader',
        'megaphone',
        'options',
        'paused',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'sociomantic',
        'star-stroke',
        'star',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /**
     * Component id
     */
    id          : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled  : PropTypes.bool,
    /**
     *  Button is focusable
     */
    isFocusable : PropTypes.bool,
    /**
     *  Label text
     */
    label       : PropTypes.string,
    /**
     *  Button click callback function: ( e ) => { ... }
     */
    onClick     : PropTypes.func,
    /**
     *  HTML value attribute
     */
    role        : PropTypes.oneOf( [ 'default', 'inverted' ] ),
    /**
     *  HTML value attribute
     */
    value       : PropTypes.string,
};

IconButton.defaultProps =
{
    buttonRef     : undefined,
    children      : undefined,
    className     : undefined,
    cssMap        : undefined,
    forceHover    : false,
    hasBackground : false,
    iconSize      : 'S',
    iconType      : undefined,
    id            : undefined,
    isDisabled    : false,
    isFocusable   : true,
    label         : undefined,
    onClick       : undefined,
    role          : 'default',
    value         : undefined,
};

IconButton.displayName = componentName;

export default IconButton;
