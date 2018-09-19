/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                             from 'react';
import PropTypes                         from 'prop-types';

import { generateId }                    from '../utils';
import { Column, InputField, Row, Text } from '../index';


export default class DimensionsInput extends React.PureComponent
{
    static propTypes = {
        /**
         *  Extra CSS class name
         */
        className         : PropTypes.string,
        /**
         *  Display as hover when required from another component
         */
        forceHover        : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError          : PropTypes.bool,
        /**
        *  Height placeholder text
        */
        heightPlaceholder : PropTypes.string,
        /**
         * Width input string value
         */
        heightValue       : PropTypes.string,
        /**
         *  HTML id attribute
         */
        id                : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled        : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly        : PropTypes.bool,
        /**
         *  Blur callback function
         */
        onBlur            : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange          : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus           : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut        : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver       : PropTypes.func,
        /**
        *  Width placeholder text
        */
        widthPlaceholder  : PropTypes.string,
        /**
         * Height input string value
         */
        widthValue        : PropTypes.string,
    };

    static defaultProps = {
        className         : undefined,
        forceHover        : false,
        hasError          : false,
        heightPlaceholder : 'height',
        heightValue       : '',
        id                : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        onBlur            : undefined,
        onChange          : undefined,
        onFocus           : undefined,
        onMouseOut        : undefined,
        onMouseOver       : undefined,
        widthPlaceholder  : 'width',
        widthValue        : '',
    };


    focusWidth()
    {
        this.widthRef.focus();
    }

    focusHeight()
    {
        this.heightRef.focus();
    }

    render()
    {
        const {
            className,
            forceHover,
            hasError,
            heightPlaceholder,
            heightValue,
            id = generateId( 'DimensionsInput' ),
            isDisabled,
            isReadOnly,
            onBlur,
            onChange,
            onFocus,
            onMouseOut,
            onMouseOver,
            widthPlaceholder,
            widthValue,
        } = this.props;

        return (
            <Row
                className     = { className }
                gutters       = "S"
                onMouseOut    = { onMouseOut }
                onMouseOver   = { onMouseOver }
                verticalAlign = "middle">
                <Column>
                    <InputField
                        autoCapitalize = "off"
                        autoComplete   = "off"
                        autoCorrect    = "off"
                        forceHover     = { forceHover }
                        hasError       = { hasError }
                        id             = { `${id}-width` }
                        isDisabled     = { isDisabled }
                        isReadOnly     = { isReadOnly }
                        onBlur         = { onBlur }
                        onChange       = { onChange }
                        onFocus        = { onFocus }
                        placeholder    = { widthPlaceholder }
                        ref            = { r => this.widthRef = r }
                        spellCheck     = { false }
                        value          = { widthValue } />
                </Column>
                <Column size = "content">
                    <Text>✕</Text>
                </Column>
                <Column>
                    <InputField
                        autoCapitalize = "off"
                        autoComplete   = "off"
                        autoCorrect    = "off"
                        forceHover     = { forceHover }
                        hasError       = { hasError }
                        id             = { `${id}-height` }
                        isDisabled     = { isDisabled }
                        isReadOnly     = { isReadOnly }
                        onBlur         = { onBlur }
                        onChange       = { onChange }
                        onFocus        = { onFocus }
                        placeholder    = { heightPlaceholder }
                        ref            = { r => this.heightRef = r }
                        spellCheck     = { false }
                        value          = { heightValue } />
                </Column>
            </Row>
        );
    }
}
