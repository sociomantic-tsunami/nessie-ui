/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import Icon                             from '../Icon';
import Spinner                          from '../Spinner';

export default class Button extends React.Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label : PropTypes.string,
        /**
        *  HTML type attribute
        */
        type  : PropTypes.oneOf( [ 'button', 'reset', 'submit' ] ),
        /**
        *  Button role/style
        */
        role  : PropTypes.oneOf( [
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
         *  Button blur callback function: ( e ) => { ... }
         */
        onBlur       : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick      : PropTypes.func,
        /**
         *  Button focus callback function: ( e ) => { ... }
         */
        onFocus      : PropTypes.func,
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
    };

    static defaultProps =
    {
        cssMap       : require( './button.css' ),
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

    buttonRef = React.createRef();

    focus()
    {
        this.buttonRef.current.focus();
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            defaultValue,
            forceHover,
            iconPosition,
            iconType,
            id = generateId( 'Button' ),
            isDisabled,
            isLoading,
            isReadOnly,
            label,
            onBlur,
            onClick,
            onFocus,
            onMouseOut,
            onMouseOver,
            role,
            type,
            value,
        } = this.props;

        const content = (
            <div className = { cssMap.content }>
                { ( iconType !== 'none' ) &&
                    <div className = { cssMap.iconContainer }>
                        <Icon
                            className = { cssMap.icon }
                            size      = "S"
                            type      = { iconType } />
                    </div>
                }
                <div className = { cssMap.label }>
                    { children || label }
                </div>
            </div>
        );

        return (
            <button
                className = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    fakeHovered : forceHover,
                    iconPosition,
                    loading     : isLoading && !isDisabled,
                    role,
                } ) }
                defaultValue = { defaultValue }
                disabled     = { isDisabled || isLoading || isReadOnly }
                id           = { id }
                onBlur       = { onBlur }
                onClick      = { onClick }
                onFocus      = { onFocus }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
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
