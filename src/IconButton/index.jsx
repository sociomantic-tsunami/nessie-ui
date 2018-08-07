import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import Icon                             from '../Icon';
import styles                           from './iconButton.css';

const killFocus = e => e.preventDefault();

export default class IconButton extends React.Component
{
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
            'megaphone',
            'options',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
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
         *  Icon theme
         */
        iconTheme : PropTypes.oneOf( [
            'button',
            'control',
            'dark',
            'light',
            'navigation',
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
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
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
        value       : PropTypes.string,
    };

    static defaultProps =
    {
        buttonRef     : undefined,
        children      : undefined,
        className     : undefined,
        cssMap        : styles,
        forceHover    : false,
        hasBackground : false,
        iconSize      : 'S',
        iconTheme     : 'control',
        id            : undefined,
        isDisabled    : false,
        isFocusable   : true,
        isReadOnly    : false,
        label         : undefined,
        onBlur        : undefined,
        onClick       : undefined,
        onFocus       : undefined,
        onMouseOut    : undefined,
        onMouseOver   : undefined,
        value         : undefined,
    };

    render()
    {
        const {
            buttonRef,
            children,
            className,
            cssMap,
            forceHover,
            hasBackground,
            iconSize,
            iconTheme,
            iconType,
            id = generateId( 'IconButton' ),
            isDisabled,
            isFocusable,
            isReadOnly,
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
                className = { buildClassName( className, cssMap, {
                    background : hasBackground,
                    disabled   : isDisabled,
                    size       : iconSize,
                }  ) }
                disabled     = { isDisabled }
                id           = { id }
                onBlur       = { onBlur }
                onClick      = { !isReadOnly && onClick }
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
                    forceHover = { forceHover }
                    isDisabled = { isDisabled }
                    size       = { iconSize }
                    theme      = { iconTheme }
                    type       = { iconType }>
                    { children || label }
                </Icon>
            </button>
        );
    }
}
