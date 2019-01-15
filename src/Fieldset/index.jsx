/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';

import { Label, IconWithTooltip } from '../index';
import ThemeContext               from '../Theming/ThemeContext';
import { createCssMap }           from '../Theming';

export default class Fieldset extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Fieldset content (usually Checkboxes or Radios)
         */
        children              : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className             : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap                : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Fieldset label string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
        *  Display as disabled
        */
        isDisabled            : PropTypes.bool,
        /**
         *  Error Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
         *  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver           : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut            : PropTypes.func,

        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition : PropTypes.oneOf( [
            'top',
            'topLeft',
            'topRight',
            'bottom',
            'bottomLeft',
            'bottomRight',
            'left',
            'leftTop',
            'leftBottom',
            'right',
            'rightTop',
            'rightBottom',
        ] ),
    };

    static defaultProps =
    {
        children              : undefined,
        className             : undefined,
        cssMap                : undefined,
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        hasError              : false,
        isDisabled            : undefined,
        label                 : undefined,
        onMouseOut            : undefined,
        onMouseOver           : undefined,
    };

    static displayName = 'Fieldset';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Fieldset, this.props ),
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            hasError,
            isDisabled,
            label,
            onMouseOut,
            onMouseOver,
        } = this.props;

        return (
            <fieldset
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                { label &&
                    <IconWithTooltip
                        className        = { cssMap.labelContainer }
                        iconIsVisible    = { !isDisabled &&
                            !!errorMessage && hasError }
                        iconPosition     = "right"
                        iconType         = "error"
                        message          = { errorMessage }
                        noWarn
                        tooltipIsVisible = { errorMessageIsVisible }
                        tooltipPosition  = { errorMessagePosition }>
                        <Label element = "legend">{ label }</Label>
                    </IconWithTooltip>
                }
                { children }
            </fieldset>
        );
    }
}
