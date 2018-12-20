/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React             from 'react';
import PropTypes         from 'prop-types';

import { generateId }    from '../utils';
import { Icon, Spinner } from '../index';
import ThemeContext      from '../Theming/ThemeContext';
import { createCssMap }  from '../Theming';

export default class Button extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  CSS class map
         */
        cssMap : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Label text
         */
        label  : PropTypes.string,
        /**
         *  HTML type attribute
         */
        type   : PropTypes.oneOf( [ 'button', 'reset', 'submit' ] ),
        /**
         *  Button role/style
         */
        role   : PropTypes.oneOf( [
            'default',
            'secondary',
            'subtle',
            'promoted',
            'critical',
            'control',
        ] ),
        /**
         *  Icon type to display (overrides customIcon)
         */
        iconType : PropTypes.oneOf( [
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
         *  Icon position relative to Button text
         */
        iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Display as disabled
         */
        isDisabled   : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly   : PropTypes.bool,
        /**
         *  Display loading state
         */
        isLoading    : PropTypes.bool,
        /**
         *  Initial HTML value attribute
         */
        defaultValue : PropTypes.string,
        /**
         *  HTML value attribute
         */
        value        : PropTypes.string,
        /**
         * HTML id attribute
         */
        id           : PropTypes.string,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick      : PropTypes.func,
        /**
         *  Mouse over callback function: ( e ) => { ... }
         */
        onMouseOver  : PropTypes.func,
        /**
         *  Mouse out callback function: ( e ) => { ... }
         */
        onMouseOut   : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
         * Callback that receives the native <button>: ( ref ) => { ... }
         */
        buttonRef    : PropTypes.func,
    };

    static defaultProps =
    {
        forceHover   : false,
        iconPosition : 'left',
        iconType     : 'none',
        id           : undefined,
        isDisabled   : false,
        isLoading    : false,
        isReadOnly   : false,
        role         : 'default',
        type         : 'button',
    };

    static displayName = 'Button';

    render()
    {
        const {
            buttonRef,
            children,
            cssMap = createCssMap( this.context.Button, this.props ),
            defaultValue,
            iconType,
            id = generateId( 'Button' ),
            isDisabled,
            isLoading,
            isReadOnly,
            label,
            onClick,
            onMouseOut,
            onMouseOver,
            type,
            value,
        } = this.props;

        const content = (
            <div className = { cssMap.content }>
                { ( iconType !== 'none' ) &&
                <div className = { cssMap.iconContainer }>
                    <Icon
                        className  = { cssMap.icon }
                        type       = { iconType }
                        size       = "S" />
                </div>
                }
                <div className = { cssMap.label }>
                    { children || label }
                </div>
            </div>
        );

        return (
            <button
                className    = { cssMap.main }
                defaultValue = { defaultValue }
                disabled     = { isDisabled || isLoading || isReadOnly }
                id           = { id }
                onClick      = { onClick }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                ref          = { buttonRef }
                type         = { type }
                value        = { value }>
                { content }
                { ( isLoading && !isDisabled ) &&
                <div className = { cssMap.loadingOverlay }>
                    <Spinner className = { cssMap.spinner } />
                </div>
                }
            </button>
        );
    }
}
