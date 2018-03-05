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
        const props = typeof value === 'object' ? value : {
            id    : value,
            label : value,
            value,
        };

        return <Checkbox { ...props } />;
    } );
}

export { buildCheckboxesFromValues };
