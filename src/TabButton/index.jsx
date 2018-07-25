import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';

const TabButton = ( {
    buttonRef,
    cssMap,
    className,
    isActive,
    isDisabled,
    label,
    onClick,
    subtitle,
    tabIndex,
} ) =>

    ( <button
        ref       = { buttonRef }
        className = { buildClassName( className, cssMap, { active: isActive } ) }
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
      </button> );

TabButton.propTypes =
{
    /**
    *  Label text
    */
    label      : PropTypes.string,
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

TabButton.defaultProps =
{
    tabIndex : 0,
    isActive : false,
    cssMap   : require( './tabButton.css' ),
};

export default TabButton;
