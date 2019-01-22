/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class TabButton extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Callback that receives the native <button>: ( ref ) => { ... }
         */
        buttonRef  : PropTypes.func,
        /**
         *  Extra CSS class name
         */
        className  : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap     : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as active
         */
        isActive   : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled : PropTypes.bool,
        /**
         *  Label text
         */
        label      : PropTypes.string,
        /**
         *  Click callback function: ( e ) => { ... }
         */
        onClick    : PropTypes.func,
        /**
         * Subtitle text
         */
        subtitle   : PropTypes.string,
        /**
         *  Index of this tab
         */
        tabIndex   : PropTypes.number,
    };

    static defaultProps =
    {
        buttonRef  : undefined,
        className  : undefined,
        cssMap     : undefined,
        isActive   : false,
        isDisabled : false,
        label      : undefined,
        onClick    : undefined,
        subtitle   : undefined,
        tabIndex   : 0,
    };

    static displayName = 'TabButton';

    constructor()
    {
        super();
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( e )
    {
        const { onClick } = this.props;
        if ( onClick )
        {
            onClick( { value: parseInt( e.currentTarget.value ) }, e );
        }
    }

    render()
    {
        const {
            buttonRef,
            cssMap = createCssMap( this.context.TabButton, this.props ),
            isDisabled,
            label,
            subtitle,
            tabIndex,
        } = this.props;

        return (
            <button
                className = { cssMap.main }
                disabled  = { isDisabled }
                onClick   = { this.handleClick }
                ref       = { buttonRef }
                role      = "tab"
                type      = "button"
                value     = { tabIndex }>
                <div className = { cssMap.content }>
                    <div className = { cssMap.label }>
                        { label }
                        { subtitle &&
                            <span className = { cssMap.subtitle }>
                                { subtitle }
                            </span>
                        }
                    </div>
                </div>
            </button>
        );
    }
}
