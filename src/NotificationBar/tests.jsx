/* global jest test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React            from 'react';
import { mount }        from 'enzyme';

import NotificationBar  from './index';

describe( 'NotificationBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NotificationBar /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );


describe( 'NotificationBarDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <NotificationBar /> );
        driver = wrapper.driver();
    } );


    describe( 'clickClose()', () =>
    {
        test( 'should trigger onClickClose callback once', () =>
        {
            const onClickClose = jest.fn();

            wrapper.setProps( { onClickClose, isDismissible: true } );

            driver.clickClose();

            expect( onClickClose ).toBeCalledTimes( 1 );
        } );
    } );
} );
