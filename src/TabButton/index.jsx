import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const TabButton = ( {
    buttonRef,
    cssMap,
    className,
    isActive,
    isDisabled,
    label,
    onClick,
    subtitle,
    tabIndex } ) =>

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
        </Css>;

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
    cssMap   : require( './tabButton.css' )
};

export default TabButton;
