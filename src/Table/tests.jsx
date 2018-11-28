/* global test jest */

import React        from 'react';
import { mount }    from 'enzyme';

import Table        from './index';


describe( 'TableDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Table /> );
        driver  = wrapper.driver();
    } );


    describe( 'toggle( index )', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( {
                columns : [
                    {
                        'title'      : 'Action',
                        'isSortable' : true,
                        'size'       : '1/4',
                    },
                    { 'title': 'Date', 'isSortable': true, 'size': '1/4' },
                    {
                        'title'      : 'Comments',
                        'isSortable' : false,
                        'size'       : '1/2',
                    },
                ],
            } );
        } );

        test(
            'should trigger onToggle callback prop once on TableCell at index',
            () =>
            {
                const onToggle = jest.fn();

                wrapper.setProps( { onToggle } );

                driver.toggle();
                expect( onToggle ).toBeCalledTimes( 1 );
            },
        );

        test(
            'should throw an expected error if TableCell is not sortable',
            () =>
            {
                const expectedError = 'TableCell cannot be toggled since it\'s \
not sortable';

                expect( () => driver.toggle( 2 ) ).toThrow( expectedError );
            },
        );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();

            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback once', () =>
        {
            const onMouseOut = jest.fn();

            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
