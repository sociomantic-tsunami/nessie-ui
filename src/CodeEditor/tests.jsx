/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */
/* eslint no-console: 0*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import CodeEditor         from './index';

describe( 'CodeEditor', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <CodeEditor /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one textArea', () =>
        {
            expect( wrapper.find( 'textarea' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        test( 'should pass value to the textarea as defaultValue', () =>
        {
            wrapper.setProps( { value: 'code!' } );

            expect( wrapper.find( 'textarea' ).prop( 'defaultValue' ) )
                .toBe( 'code!' );
        } );
    } );
} );

describe( 'CodeEditorDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <CodeEditor /> );
        driver  = wrapper.driver();
    } );


    describe( 'isReadOnly()', () =>
    {
        test( 'should return true if the editor cannot be edited', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( driver.isReadOnly() ).toBeTruthy();
            expect( driver.isDisabled() ).toBeFalsy();
        } );
    } );

    describe( 'isDisabled()', () =>
    {
        test( 'should return true if the editor is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( driver.isDisabled() ).toBeTruthy();
            expect( driver.isReadOnly() ).toBeFalsy();
        } );
    } );


    describe( 'blur()', () =>
    {
        test.skip( 'should call onBlur once', () =>
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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
blur since it is disabled';

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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
blur since it is read only';

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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
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


    describe.skip( 'change()', () =>
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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot be \
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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot be \
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

            const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
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

                const expectedError = 'CodeEditor \'Tekeli-li\' cannot have \
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
