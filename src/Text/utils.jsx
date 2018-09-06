/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React from 'react';

import Text  from './index';


const wrapText = ( node, props ) =>
    ( typeof node === 'string' ? <Text { ...props }>{ node }</Text> : node );


export { wrapText };
export default { wrapText };
