import React        from 'react';
import { mount }    from 'enzyme';

import { ComboBox } from '../index';

describe( 'ComboBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <ComboBox /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should render ComboBox', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );
} );
