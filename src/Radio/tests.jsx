/* eslint-disable no-magic-numbers, no-unused-expressions */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Checkable          from '../proto/Checkable';

import Radio              from './index';


describe( 'Radio', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Radio /> );
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
            test( 'should be `undefined` if readOnly', () =>
            {
                const onChange = jest.fn().mockImplementation( e =>
                    targetChecked = e.target.checked );
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.prop( onChange ) ).toBeUndefined();
            } );

            test(
                'should be passed as `undefined` to Checkable if readOnly',
                () =>
                {
                    const onChange = jest.fn().mockImplementation( e =>
                        targetChecked = e.target.checked );
                    wrapper.setProps( { isReadOnly: true, onChange } );

                    expect( wrapper.find( Checkable ).prop( onChange ) )
                        .toBeUndefined();
                },
            );

            test( 'should be defined if not readOnly', () =>
            {
                const onChange = jest.fn().mockImplementation( e =>
                    targetChecked = e.target.checked );
                wrapper.setProps( { onChange } );

                expect( wrapper.prop( onChange ) )
                    .toBe( wrapper.instance().onChange );
            } );
        } );
    } );
} );


describe( 'RadioDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Radio /> );
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
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot have blur \
since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
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
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot have blur \
since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
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
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot have \
focus since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
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
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot have \
focus since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
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

        test( 'should not call onChange if Radio is checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange, isChecked: true } );

            driver.change();
            expect( onChange ).not.toBeCalled();
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
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot be \
changed since it is disabled';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
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
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot be \
changed since it is read only';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
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
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot be \
clicked since it is disabled';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
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
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot be \
clicked since it is read only';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
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

        test( 'throws the expected error when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

            const expectedError = 'Radio \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

            expect( () => driver.mouseOut() ).toThrow( expectedError );
        } );

        test( 'does not call simulate( event ) when isDisabled', () =>
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
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Radio \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
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
