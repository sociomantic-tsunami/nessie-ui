/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { Icon }         from '..';

import { generateId }   from '../utils';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

const killFocus = e => e.preventDefault();

export default class IconButton extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
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
         *  Icon type to display (overrides customIcon)
         */
        iconType      : PropTypes.oneOf( [
            'account',
            'add-circle',
            'add',
            'alert',
            'approved',
            'arrow',
            'arrow-up',
            'arrow-down',
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
            'star-stroke',
            'star',
            'sociomantic',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         * HTML id attribute
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
         *  Button blur callback function
         */
        onBlur      : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick     : PropTypes.func,
        /**
         *  Button focus callback function
         */
        onFocus     : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         *  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         *  HTML value attribute
         */
        role        : PropTypes.oneOf( [ 'default', 'inverted' ] ),
        /**
         *  HTML value attribute
         */
        value       : PropTypes.string,
    };

    static defaultProps =
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
        onBlur        : undefined,
        onClick       : undefined,
        onFocus       : undefined,
        onMouseOut    : undefined,
        onMouseOver   : undefined,
        role          : 'default',
        value         : undefined,
    };

    static displayName = 'IconButton';

    render()
    {
        const {
            buttonRef,
            children,
            cssMap = createCssMap( this.context.IconButton, this.props ),
            iconSize,
            iconType,
            id = generateId( 'IconButton' ),
            isDisabled,
            isFocusable,
            label,
            onBlur,
            onClick,
            onFocus,
            onMouseOut,
            onMouseOver,
            value,
        } = this.props;

        return (
            <button
                className = { cssMap.main }
                disabled     = { isDisabled }
                id           = { id }
                onBlur       = { onBlur }
                onClick      = { onClick }
                onFocus      = { onFocus }
                onMouseDown  = { !isFocusable ? killFocus : undefined }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                ref          = { buttonRef }
                tabIndex     = { isFocusable ? '0' : '-1' }
                type         = "button"
                value        = { value }>
                <Icon
                    className  = { cssMap.icon }
                    isDisabled = { isDisabled }
                    size       = { iconSize }
                    type       = { iconType }>
                    { children || label }
                </Icon>
            </button>
        );
    }
}
