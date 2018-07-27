/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React            from 'react';
import { mount }        from 'enzyme';

import { Checkbox }     from '../index';

import CheckableGroup   from './index';

describe( 'CheckableGroupDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <CheckableGroup /> );
        driver  = wrapper.driver();
    } );


    describe( 'change( index )', () =>
    {
        test( 'should call onChange exactly once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( {
                label    : 'Tekeli-li',
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                ],
                onChange,
            } );

            wrapper.driver().change();

            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
be changed since it is disabled';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

                expect( () => driver.change() );
                expect( onChange ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
be changed since it is read only';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

                expect( () => driver.change() );
                expect( onChange ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
have onMouseOver since it is disabled';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onMouseOver,
                } );

                expect( () => driver.mouseOver() );
                expect( onMouseOver ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
have onMouseOver since it is read only';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const mouseOver = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    mouseOver,
                } );

                expect( () => driver.mouseOver() );
                expect( mouseOver ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
have onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onMouseOut,
                } );

                expect( () => driver.mouseOut() );
                expect( onMouseOut ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'CheckableGroup \'Tekeli-li\' cannot \
have onMouseOut since it is read only';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onMouseOut,
                } );

                expect( () => driver.mouseOut() );
                expect( onMouseOut ).not.toBeCalled();
            } );
        } );
    } );
} );
