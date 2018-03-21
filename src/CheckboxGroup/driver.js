import React          from 'react';

import CheckboxGroup  from '../CheckboxGroup';

export default class CheckboxGroupDriver
{
    selectByIndex( index )
    {
        this.items = CheckboxGroup.map( item => React.cloneElement( item ) );
        return this.items[ index ];
    }
}
