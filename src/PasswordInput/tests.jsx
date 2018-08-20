/* eslint-disable no-unused-expressions, no-magic-numbers  */

import React                    from 'react';
import { mount, shallow }       from 'enzyme';

import { TextInputWithIcon }    from '../index';

import PasswordInput            from './index';


describe( 'PasswordInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <PasswordInput /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one TextInputWithIcon', () =>
    {
        expect( wrapper.find( TextInputWithIcon ) ).toHaveLength( 1 );
    } );

    test( 'it should pass inputType "password" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .toBe( 'password' );
    } );

    test( 'it should pass inputType "text" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .toBe( 'text' );
    } );

    test( 'it should pass iconType "show" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .toBe( 'show' );
    } );

    test( 'it should pass iconType "hide" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .toBe( 'hide' );
    } );
} );

describe( 'PasswordInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <PasswordInput /> );
        driver  = wrapper.driver();
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop once', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( {
                title   : 'Test',
                onFocus : focusSpy,
            } );

            driver.focus();
            expect( focusSpy ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
focus since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
focus since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should fire the onBlur callback prop once', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title  : 'Test',
                onBlur : blurSpy,
            } );

            driver.blur();
            expect( blurSpy ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
blur since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
blur since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'change( val )', () =>
    {
        test( 'should fire the onChange callback prop once', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                onChange : changeSpy,
            } );

            driver.change( 'Azathoth' );
            expect( changeSpy ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot be \
changed since it is disabled';

                expect( () => driver.change( 'Azathoth' ) )
                    .toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.change( 'Azathoth' ) );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot be \
changed since it is read only';

                expect( () => driver.change( 'Azathoth' ) )
                    .toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.change( 'Azathoth' ) );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should fire the onKeyPress callback prop once', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
            } );

            driver.keyPress();
            expect( keyPressSpy ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
keyPress since it is disabled';

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.keyPress() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
keyPress since it is read only';

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.keyPress() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
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


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
onMouseOver since it is disabled';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
onMouseOver since it is read only';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
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


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
onMouseOut since it is read only';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'clickIcon()', () =>
    {
        test( 'should trigger onClick callback once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( {
                onClickIcon,
            } );

            driver.clickIcon();

            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
onClickIcon since it is disabled';

                expect( () => driver.clickIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.clickIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
onClickIcon since it is read only';

                expect( () => driver.clickIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.clickIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOverIcon()', () =>
    {
        test( 'should trigger onMouseOverIcon callback once', () =>
        {
            const onMouseOverIcon = jest.fn();

            wrapper.setProps( { onMouseOverIcon } );

            driver.mouseOverIcon();

            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
onMouseOverIcon since it is disabled';

                expect( () => driver.mouseOverIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOverIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
onMouseOverIcon since it is read only';

                expect( () => driver.mouseOverIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOverIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOutIcon()', () =>
    {
        test( 'should trigger onMouseOutIcon callback once', () =>
        {
            const onMouseOutIcon = jest.fn();

            wrapper.setProps( { onMouseOutIcon } );

            driver.mouseOutIcon();

            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                const expectedError = 'PasswordInput \'Cthulhu\' cannot have \
onMouseOutIcon since it is disabled';

                expect( () => driver.mouseOutIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOutIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'PasswordInput \'Tekeli-li\' cannot have \
onMouseOutIcon since it is read only';

                expect( () => driver.mouseOutIcon() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOutIcon() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
