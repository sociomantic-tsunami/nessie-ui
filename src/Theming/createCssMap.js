/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const createCssMap = ( theme = {}, props = {} ) =>
{
    if ( typeof theme === 'function' ) return theme( props );
    return theme;
};

export default createCssMap;
