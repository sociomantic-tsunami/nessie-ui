/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Checkable          from '../proto/Checkable';

import Checkbox           from './index';

describe( 'Checkbox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Checkbox /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( wrapper.prop( 'isReadOnly' ) ).toBe( false );
            } );

            test( 'should be passed to Checkable', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
            } );

            test( 'should be passed to Checkable', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );
    } );
} );


describe( 'CheckboxDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Checkbox /> );
        driver   = wrapper.driver();
    } );


    describe( 'blur()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot have blur \
since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                expect( () => driver.blur() );
                expect( onBlur ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot have blur \
since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                expect( () => driver.blur() );
                expect( onBlur ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot have \
focus since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                expect( () => driver.focus() );
                expect( onFocus ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot have \
focus since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                expect( () => driver.focus() );
                expect( onFocus ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should change the value of target.checked to false', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { onChange, isChecked: true } );

            driver.change();
            expect( targetChecked ).toBeFalsy();
        } );

        test( 'should change the value of target.checked to true', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { onChange, isChecked: false } );

            driver.change();
            expect( targetChecked ).toBeTruthy();
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot be \
changed since it is disabled';

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
                const expectedError = 'Checkbox \'Tekeli-li\' cannot be \
changed since it is read only';

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


    describe( 'click()', () =>
    {
        test( 'should call onClick once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot be \
clicked since it is disabled';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onClick,
                } );

                expect( () => driver.click() );
                expect( onClick ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );
                const expectedError = 'Checkbox \'Tekeli-li\' cannot be \
clicked since it is read only';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onClick,
                } );

                expect( () => driver.click() );
                expect( onClick ).not.toBeCalled();
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

        it( 'throws the expected error when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );
            const expectedError = 'Checkbox \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

            expect( () => driver.mouseOut() ).toThrow( expectedError );
        } );

        it( 'does not call simulate( event ) when isDisabled', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                isDisabled : true,
                label      : 'Tekeli-li',
                onMouseOver,
            } );

            expect( () => driver.mouseOut() );
            expect( onMouseOver ).not.toBeCalled();
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
                const expectedError = 'Checkbox \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

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
    } );
} );
