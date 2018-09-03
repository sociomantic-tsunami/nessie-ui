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

import InputContainer       from './InputContainer';
import { buildDisplayName } from '../utils';

const withInputContainer = Component =>
{
    const WithInputContainer = ( {
        errorMessage,
        errorMessageIsVisible,
        errorMessagePosition,
        label,
        labelPosition,
        onMouseOut,
        onMouseOver,
        ...inputProps
    } ) => (
        <InputContainer
            errorMessage          = { errorMessage }
            errorMessageIsVisible = { errorMessageIsVisible }
            errorMessagePosition  = { errorMessagePosition }
            hasError              = { inputProps.hasError }
            id                    = { inputProps.id }
            isDisabled            = { inputProps.isDisabled }
            label                 = { label }
            labelPosition         = { labelPosition }
            onMouseOut            = { onMouseOut }
            onMouseOver           = { onMouseOver }>
            <Component { ...inputProps } />
        </InputContainer>
    );

    WithInputContainer.propTypes = {
        ...Component.propTypes,
        /**
         *  Error tooltip message to show
         */
        errorMessage          : PropTypes.node,
        /**
         *  Whether error tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
         *  Position of tooltip relative to error icon
         */
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
         *  Component label
         */
        label                 : PropTypes.node,
        /**
         *  Position of component label relative to component
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    };

    WithInputContainer.defaultProps = {
        ...Component.defaultProps,
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        label                 : undefined,
        labelPosition         : 'top',
    };

    WithInputContainer.displayName =
        buildDisplayName( WithInputContainer, Component );

    return WithInputContainer;
};

export default withInputContainer;
