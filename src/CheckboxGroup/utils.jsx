import React        from 'react';

import { Checkbox } from '../index';

/**
 * ## buildCheckboxesFromValues
 * Builds an array of Checkbox components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @return  {Array.<ReactElement>}
 *
 */
function buildCheckboxesFromValues( values = [] )
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
            <Checkbox
                key         = { checkboxValue }
                value       = { checkboxValue }
                label       = { checkboxLabel }
                isDisabled  = { value.isDisabled }
                isReadOnly  = { value.isReadOnly }
                hasError    = { value.hasError } />
        );
    } );
}

export { buildCheckboxesFromValues };
