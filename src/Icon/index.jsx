import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Icon extends Component
{
    static propTypes =
    {
        /**
         *  Icon size
         */
        size : PropTypes.oneOf( [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ] ),
        /**
         *  Icon theme
         */
        theme : PropTypes.oneOf( [
            'light',
            'dark',
            'control',
            'button',
            'navigation'
        ] ),
        /**
         *  Icon to show
         */
        type : PropTypes.oneOf( [
            'account',
            'add',
            'calendar',
            'close',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'info',
            'inspect',
            'left',
            'link',
            'preview',
            'reset',
            'right',
            'search',
            'up',
            'upload',
            'validation',
            'alert',
            'approved',
            'declined',
            'ended',
            'error',
            'pending',
            'show',
            'hide'
        ] ),
        /**
        *  Icon variant to show
        */
        variant : PropTypes.oneOf( [
            'fill',
            'stroke'
        ] ),
        /**
         * Icon label
         */
        label       : PropTypes.string,
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  onMouseOver callback function: ( e ) = { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         *  onMouseOut callback function: ( e ) = { ... }
         */
        onMouseOut  : PropTypes.func

    };

    static defaultProps =
    {
        size       : 'S',
        theme      : 'light',
        forceHover : false,
        isDisabled : false,
        variant    : 'fill',
        cssMap     : require( './icon.css' )
    };

    render()
    {
        const {
            children,
            className = '',
            cssMap,
            forceHover,
            theme,
            isDisabled,
            label,
            onMouseOut,
            onMouseOver,
            size,
            type,
            variant } = this.props;

        let xLink;
        let needsVariant = false;

        const statusIconArray = [
            'alert',
            'approved',
            'declined',
            'ended',
            'error',
            'pending'
        ];

        if ( statusIconArray.indexOf( type ) >= 0 )
        {
            needsVariant = true;
            xLink        = `#icon__${type}-${variant}`;
        }
        else
        {
            xLink        = `#icon__${type}`;
        }

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { size,
                    type,
                    theme,
                    variant     : needsVariant && variant,
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && forceHover,
                } }>

                <svg
                    className      = { className }
                    aria-label     = { children || label }
                    onMouseOver    = { onMouseOver }
                    onMouseOut     = { onMouseOut }>
                    <use xlinkHref = { xLink } />
                </svg>
            </Css>
        );
    }
}
