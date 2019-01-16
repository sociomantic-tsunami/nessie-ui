/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React        from 'react';

import { Checkbox } from '../index';

/**
 * ## buildCheckboxesFromValues
 * Builds an array of Checkbox components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @param   {Array.<String>|Array.<Object>} selectedValues  array of selectedValues
 *
 * @param   {Func} onChange  onChange prop
 *
 * @param   {Func} setValue  update selectedValue state
 *
 * @return  {Array.<ReactElement>}
 *
 */
function buildCheckboxesFromValues( values = [], onChange, selectedValues, setValue )
{
    const onChangeCB = ( e )=>
    {
        const { target } = e;

        if(!selectedValues) return;

        if(target.checked){
            if(selectedValues.indexOf(target.value) === -1){
                const result = [...selectedValues, target.value];
                setValue( result );
            }
        } else {
            const index = selectedValues.indexOf(target.value);
            selectedValues.splice(index, 1);
            setValue( selectedValues );
        }
    }

    return values.map( value =>
    {
        const props = typeof value === 'object' ? value : {
            id    : value,
            label : value,
            value,
            onChange: onChange || onChangeCB
        };

        return <Checkbox { ...props } />;
    } );
}

export { buildCheckboxesFromValues };
