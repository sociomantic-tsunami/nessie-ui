/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import ThemeContext from './ThemeContext';

/* interpolates component’s props into the theme */
const createCssMap = ( theme = {}, props = {} ) =>
    Object.entries( theme ).reduce(
        ( cssMap,  [ key, value ] ) =>
        {
            cssMap[ key ] = typeof value === 'function' ?
                value( props ) : value;
            return cssMap;
        },
        {},
    );

const { Consumer : ThemeConsumer, Provider : ThemeProvider } = ThemeContext;

export { createCssMap, ThemeConsumer, ThemeProvider };
