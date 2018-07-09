import React            from 'react';
import PropTypes        from 'prop-types';

import { generateId }   from '../utils';
              
import Icon             from '../Icon';

const killFocus = e => e.preventDefault();

export default class IconButton extends React.Component
{
    static propTypes =
    {
        /**
         *  Label text
         */
        label    : PropTypes.string,
        /**
         *  Label text (overrides label prop)
         */
        children : PropTypes.string,
        /**
         *  Icon size to display
         */
        iconSize : PropTypes.oneOf( [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ] ),
        /**
         *  Icon type to display (overrides customIcon)
         */
        iconType : PropTypes.oneOf( [
            'account',
            'add',
            'add-circle',
            'alert',
            'approved',
            'arrow',
            'bell',
            'board',
            'calendar',
            'close',
            'close-circle',
            'close-thick',
            'dash',
            'dashboard',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'edit-circle',
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
            'star',
            'star-stroke',
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
            'light',
            'dark',
            'button',
            'control',
            'navigation'
        ] ),
        /**
         *  Button is focusable
         */
        isFocusable   : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled    : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly    : PropTypes.bool,
        /**
         *  HTML value attribute
         */
        value         : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        id            : PropTypes.string,
        /**
         *  Button focus callback function
         */
        onFocus       : PropTypes.func,
        /**
         *  Button blur callback function
         */
        onBlur        : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick       : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover    : PropTypes.bool,
        /**
         * Callback that receives a ref to the <button>: ( ref ) => { ... }
         */
        buttonRef     : PropTypes.func,
        /**
         * Adds a background to the icon
         */
        hasBackground : PropTypes.bool,
    };

    static defaultProps =
    {
        iconSize      : 'S',
        iconTheme     : 'control',
        id            : undefined,
        isFocusable   : true,
        isDisabled    : false,
        isReadOnly    : false,
        forceHover    : false,
        cssMap        : require( './iconButton.css' ),
        hasBackground : false
    };

    render()
    {
        const {
            buttonRef,
            children,
            className,
            cssMap,
            hasBackground,
            iconSize,
            iconType,
            forceHover,
            iconTheme,
            id = generateId( 'IconButton' ),
            isDisabled,
            isFocusable,
            isReadOnly,
            label,
            onBlur,
            onFocus,
            onClick,
            value
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled   : isDisabled,
                    size       : iconSize,
                    background : hasBackground
                } }>
                <button
                    ref       = { buttonRef }
                    type      = "button"
                    className = { className }
                    value     = { value }
                    id        = { id }
                    disabled  = { isDisabled }
                    onClick   = { !isReadOnly && onClick }
                    onBlur    = { onBlur }
                    onFocus   = { onFocus }
                    tabIndex  = { isFocusable ? '0' : '-1' }
                    onMouseDown = { !isFocusable && killFocus }>
                    <Icon
                        className  = { cssMap.icon }
                        size       = { iconSize }
                        type       = { iconType }
                        theme      = { iconTheme }
                        isDisabled = { isDisabled }
                        forceHover = { forceHover }>
                        { children || label }
                    </Icon>
                </button>
            </Css>
        );
    }
}
