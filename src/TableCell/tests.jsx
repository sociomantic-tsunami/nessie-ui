/* global test jest */

import React       from 'react';
import { mount }   from 'enzyme';

import TableCell   from './index';

describe( 'TableCellDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <TableCell /> );
        driver  = wrapper.driver();
    } );

    describe( 'toggle()', () =>
    {
        test( 'should trigger onToggle callback function once', () =>
        {
            const onToggle = jest.fn();

            wrapper.setProps( {
                onToggle,
                isHeader   : true,
                isSortable : true,
            } );

            driver.toggle();

            expect( onToggle ).toBeCalledTimes( 1 );
        } );
    } );
} );
