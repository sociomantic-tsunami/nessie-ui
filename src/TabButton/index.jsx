import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class TabButton extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label      : PropTypes.string.isRequired,
        /**
         * Subtitle text
         */
        subtitle   : PropTypes.string,
        /**
        *  Index of this tab
        */
        tabIndex   : PropTypes.number,
        /**
        *  Display as active
        */
        isActive   : PropTypes.bool,
        /**
        *  Display as Disabled
        */
        isDisabled : PropTypes.bool,
        /**
        *  onClick callback function: ( e ) => { ... }
        */
        onClick    : PropTypes.func,
        /**
         * Callback that receives the native <button>: ( ref ) => { ... }
         */
        buttonRef  : PropTypes.func,
    };

    static defaultProps =
    {
        tabIndex : 0,
        isActive : false,
        cssMap   : require( './tabButton.css' )
    };


    render()
    {
        const {
            buttonRef,
            cssMap,
            className,
            isActive,
            isDisabled,
            label,
            onClick,
            subtitle,
            tabIndex
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { active: isActive } }>
                <button
                    ref       = { buttonRef }
                    className = { className }
                    role      = "tab"
                    value     = { String( tabIndex ) }
                    disabled  = { isDisabled }
                    onClick   = { onClick }>
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
            </Css>
        );
    }
}
