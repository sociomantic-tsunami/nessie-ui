/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import PropTypes                         from 'prop-types';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'TabButton';

const TabButton = forwardRef( ( props, ref ) =>
{
    const cssMap = useThemeClasses( componentName, props );

    const {
        isDisabled,
        label,
        style,
        subtitle,
        tabIndex,
    } = props;

    return (
        <button
            { ...attachEvents( props, {
                onClick : { tabIndex },
            } ) }
            className = { cssMap.main }
            disabled  = { isDisabled }
            ref       = { ref }
            role      = "tab"
            style     = { style }
            type      = "button">
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
} );

TabButton.propTypes =
{
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
     *  Click callback function: ( { tabIndex } ) => ...
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
    /**
     *  Style overrides
     */
    style      : PropTypes.objectOf( PropTypes.string ),
};

TabButton.defaultProps =
{
    className  : undefined,
    cssMap     : undefined,
    isActive   : false,
    isDisabled : false,
    label      : undefined,
    onClick    : undefined,
    subtitle   : undefined,
    tabIndex   : 0,
    style      : undefined,
};

TabButton.displayName = componentName;

export default TabButton;
