/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { generateId }   from '../utils';
import { Icon }         from '../index';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

export default class ToggleButton extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  label content (JSX node; overrides label prop)
         */
        children     : PropTypes.node,
        /**
         *  CSS class name
         */
        className    : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         *  icon position relative to text
         */
        iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  icon type to display
         */
        iconType     : PropTypes.oneOf( [
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
        *  display as disabled
        */
        isDisabled  : PropTypes.bool,
        /**
         *  display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  display with pressed state
         */
        isPressed   : PropTypes.bool,
        /**
         *  label text
         */
        label       : PropTypes.string,
        /**
         *  blur callback function: ( e ) => { ... }
         */
        onBlur      : PropTypes.func,
        /**
         *  click callback function: ( e ) => { ... }
         */
        onClick     : PropTypes.func,
        /**
         *  focus callback function: ( e ) => { ... }
         */
        onFocus     : PropTypes.func,
        /**
         *  mouse out callback function: ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         *  mouse over callback function: ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
        *  ToggleButton role (style)
        */
        role        : PropTypes.oneOf( [ 'primary', 'secondary', 'subtle' ] ),
        /**
         *  sub-label text
         */
        subLabel    : PropTypes.string,
    };

    static defaultProps =
    {
        children     : undefined,
        className    : undefined,
        cssMap       : undefined,
        iconPosition : 'left',
        iconType     : 'none',
        id           : undefined,
        isDisabled   : false,
        isPressed    : false,
        isReadOnly   : false,
        label        : undefined,
        onBlur       : undefined,
        onClick      : undefined,
        onFocus      : undefined,
        onMouseOut   : undefined,
        onMouseOver  : undefined,
        role         : 'primary',
        subLabel     : undefined,
    };

    static displayName = 'ToggleButton';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.ToggleButton, this.props ),
            iconType,
            id = generateId( 'ToggleButton' ),
            isDisabled,
            isPressed,
            isReadOnly,
            label,
            onBlur,
            onClick,
            onFocus,
            onMouseOut,
            onMouseOver,
            role,
            subLabel,
        } = this.props;

        return (
            <button
                aria-pressed = { isPressed ? 'true' : 'false' }
                className    = { cssMap.main }
                disabled     = { isDisabled }
                id           = { id }
                onBlur       = { onBlur }
                onClick      = { onClick }
                onFocus      = { onFocus }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                readOnly     = { isReadOnly }
                role         = { role }
                type         = "button">
                <div className = { cssMap.flexContainer }>
                    { iconType !== 'none' &&
                        <Icon
                            className = { cssMap.icon }
                            size      =  "S"
                            type      = { iconType } />
                    }
                    <div className = { cssMap.labelContainer }>
                        <div className = { cssMap.title }>
                            { children || label }
                        </div>
                        { subLabel &&
                            <div className = { cssMap.subLabel }>
                                { subLabel }
                            </div>
                        }
                    </div>
                </div>
            </button>
        );
    }
}
