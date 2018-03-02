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
        let checkboxValue;
        let checkboxLabel;

        if ( typeof value === 'object' )
        {
            checkboxValue = value.value;
            checkboxLabel = value.label;
        }
        else
        {
            checkboxValue = checkboxLabel = value;
        }

        return (
            <Radio
                key         = { checkboxValue }
                value       = { checkboxValue }
                label       = { checkboxLabel }
                isDisabled  = { value.isDisabled }
                isReadOnly  = { value.isReadOnly }
                hasError    = { value.hasError } />
        );
    } );
}

export { buildRadiosFromValues };
