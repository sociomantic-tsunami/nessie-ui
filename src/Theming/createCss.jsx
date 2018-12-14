/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* interpolates component’s props into the theme */
const createCssMap = ( cssMap = {}, props = {} ) =>
    Object.entries( cssMap ).reduce(
        ( result,  [ key, value ] ) =>
        {
            result[ key ] = typeof value === 'function' ?
                value( props ) : value;
            return result;
        },
        {},
    );

export { createCssMap };
