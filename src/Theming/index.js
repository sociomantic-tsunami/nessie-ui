/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import ThemeContext from './ThemeContext';

const { Consumer : ThemeConsumer, Provider : ThemeProvider } = ThemeContext;
export { ThemeConsumer, ThemeProvider };

export createCssMap from './createCssMap';
