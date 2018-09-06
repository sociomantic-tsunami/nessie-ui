/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';

import { Radio } from '../index';

/**
 * ## buildRadiosFromValues
 * Builds an array of Radio components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @return  {Array.<ReactElement>}
 *
 */
function buildRadiosFromValues( values = [] )
{
    return values.map( value =>
    {
        const props = typeof value === 'object' ? value : {
            id    : value,
            label : value,
            value,
        };

        return <Radio { ...props } />;
    } );
}

export { buildRadiosFromValues };
