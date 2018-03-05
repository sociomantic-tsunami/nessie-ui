import React   from 'react';

import { Tag } from '../index';


/**
 * ## buildTagsFromValues
 * Builds an array of Tags components from an array of values
 *
 * @param   {Array.<String>|Array.<Object>} values  array of values
 *
 * @return  {Array.<ReactElement>}
 *
 */
function buildTagsFromValues( values = [] )
{
    return values.map( value =>
    {
        const props = typeof value === 'object' ? value : {
            id    : value,
            label : value,
            value,
        };

        return <Tag { ...props } />;
    } );
}

export { buildTagsFromValues };
