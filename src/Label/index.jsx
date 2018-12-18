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

import Text                 from '../Text';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class Label extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
        *  Label text
        */
        label            : PropTypes.string,
        /**
         * HTML element to use (legend should only be used inside a Fieldset)
         */
        element          : PropTypes.oneOf( [ 'label', 'legend' ] ),
        /**
         *  ID of element this Label labels (HTML for attribute)
         */
        htmlFor          : PropTypes.string,
        /**
        *  Don’t wrap text to the next line
        */
        noWrap           : PropTypes.bool,
        /**
         *  Clip overflow
         */
        overflowIsHidden : PropTypes.bool,
        /**
         *  Mouse over callback function
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut       : PropTypes.func,
    };

    static defaultProps =
    {
        element          : 'label',
        noWrap           : false,
        overflowIsHidden : false,
    };

    static displayName = 'Label';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Label, this.props ),
            element,
            htmlFor,
            label,
            noWrap,
            onMouseOut,
            onMouseOver,
            overflowIsHidden,
        } = this.props;

        const LabelElement = element || 'label';

        return (
            <LabelElement
                className    = { cssMap.main }
                htmlFor      = { element === 'label' ? htmlFor : null }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut } >
                <Text
                    className        = { cssMap.label }
                    noWrap           = { noWrap }
                    overflowIsHidden = { overflowIsHidden }>
                    { children || label }
                </Text>
            </LabelElement>
        );
    }
}
