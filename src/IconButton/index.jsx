import React         from 'react';
import PropTypes     from 'prop-types';

import Component     from '../proto/Component';
import Css           from '../hoc/Css';
import Icon          from '../Icon';

export default class IconButton extends Component
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
            'calendar',
            'close',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'hide',
            'info',
            'inspect',
            'left',
            'link',
            'preview',
            'reset',
            'right',
            'search',
            'show',
            'up',
            'upload',
            'validation'
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
         *  Display as disabled
         */
        isDisabled : PropTypes.bool,

        /**
         *  Display as read-only
         */
        isReadOnly : PropTypes.bool,

        /**
         *  HTML value attribute
         */
        value      : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        id         : PropTypes.string,
        /**
         *  Button focus callback function
         */
        onFocus    : PropTypes.func,
        /**
         *  Button blur callback function
         */
        onBlur     : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick    : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover : PropTypes.bool,
        /**
         * Callback that receives a ref to the <button>: ( ref ) => { ... }
         */
        buttonRef  : PropTypes.func,
    };

    static defaultProps =
    {
        iconSize   : 'S',
        iconTheme  : 'control',
        isDisabled : false,
        isReadOnly : false,
        forceHover : false,
        cssMap     : require( './iconButton.css' )
    };

    render()
    {
        const {
            buttonRef,
            children,
            className,
            cssMap,
            iconSize,
            iconType,
            forceHover,
            iconTheme,
            isDisabled,
            isReadOnly,
            label,
            onBlur,
            onFocus,
            onClick,
            value
        } = this.props;

        const { id } = this.state;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled : isDisabled,
                    size     : iconSize } }>
                <button
                    ref       = { buttonRef }
                    type      = "button"
                    className = { className }
                    value     = { value }
                    id        = { id }
                    disabled  = { isDisabled }
                    onClick   = { !isReadOnly && onClick }
                    onBlur    = { onBlur }
                    onFocus   = { onFocus } >
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
