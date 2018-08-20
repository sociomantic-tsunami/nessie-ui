/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Icon               from './index';


describe( 'Icon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Icon /> );
        instance = wrapper.instance();
    } );

    test( 'should have size S by default', () =>
    {
        expect( instance.props.size ).toBe( 'S' );
    } );

    test( 'should have light theme by default', () =>
    {
        expect( instance.props.theme ).toBe( 'light' );
    } );
} );


describe( 'IconDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Icon /> );
        driver  = wrapper.driver();
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should fire onMouseOver event once', () =>
        {
            const onMouseOver = jest.fn();
            const onMouseOut = jest.fn();
            wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

            wrapper.simulate( 'mouseleave' );

            expect( onMouseOut ).toBeCalledTimes( 1 );
            expect( onMouseOver ).not.toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError = 'Cannot mouseOver because it is disabled';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper, 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should fire onMouseOver event once', () =>
        {
            const onMouseOver = jest.fn();
            const onMouseOut = jest.fn();
            wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

            wrapper.simulate( 'mouseenter' );

            expect( onMouseOver ).toBeCalledTimes( 1 );
            expect( onMouseOut ).not.toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError = 'Cannot mouseOut because it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper, 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
