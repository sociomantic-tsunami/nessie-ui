/* eslint-disable no-magic-numbers, no-multi-str */

import React     from 'react';
import { mount } from 'enzyme';

import Tooltip   from './index';


describe( 'TooltipDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Tooltip><h2> Who am I?</h2></Tooltip> );
        driver  = wrapper.driver();
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should fire onMouseOver event', () =>
        {
            const onMouseOverHandler = jest.fn();
            wrapper.setProps( {
                message     : 'Tekeli-li!',
                onMouseOver : onMouseOverHandler,
            } );

            driver.mouseOver();
            expect( onMouseOverHandler ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should fire onMouseOut event', () =>
        {
            const onMouseOutHandler = jest.fn();
            wrapper.setProps( {
                message    : 'Tekeli-li!',
                onMouseOut : onMouseOutHandler,
            } );

            driver.mouseOut();
            expect( onMouseOutHandler ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickClose()', () =>
    {
        test( 'should trigger onClickClose callback prop once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                message       : 'Sithis',
                isDismissible : true,
            } );

            driver.clickClose();
            expect( onClickClose ).toBeCalledTimes( 1 );
        } );

        test( 'should throw an expected error when is not dismissable', () =>
        {
            const expectedError = 'Tooltip cannot simulate clickClose since \
it is not dismissable';
            wrapper.setProps( {
                message : 'Sithis',
            } );

            expect( () => driver.clickClose() ).toThrow( expectedError );
        } );
    } );
} );
