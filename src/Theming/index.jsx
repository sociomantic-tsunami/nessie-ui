/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */
/* eslint-disable react/prop-types */

import React        from 'react';

import DefaultTheme from '../DefaultTheme';
import ThemeContext from './ThemeContext';

const { Consumer : ThemeConsumer, Provider } = ThemeContext;

const ThemeProvider = props => (
    <Provider value = { { ...DefaultTheme, ...props.value } }>
        {props.children}
    </Provider>
);

export { ThemeConsumer, ThemeProvider };

export createCssMap from './createCssMap';
