import React                       from 'react';
import { shallow }                 from 'enzyme';

import DateTimeInput               from './index';

describe( 'DateTimeInput', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <DateTimeInput /> );
    } );

    describe( 'getMainInputValue()', () =>
    {
        it( 'should get main input value', () =>
        {
            wrapper.setProps( {
                inputValue : '2018-05-05 12:00'
            } );
            wrapper.getMainInputValue();

            expect( wrapper.getMainInputValue() ).to.eql( '2018-05-05 12:00' );
        } );
    } );
} );
