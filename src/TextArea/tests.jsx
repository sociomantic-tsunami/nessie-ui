/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import { InputField }     from '../index';
import InputContainer     from '../proto/InputContainer';

import TextArea           from './index';


describe( 'TextArea', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextArea /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one InputContainer', () =>
    {
        expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );

    test( 'InputField should have element="textarea"', () =>
    {
        expect( wrapper.find( InputField ).prop( 'element' ) )
            .toBe( 'textarea' );
    } );
} );


describe( 'TextAreaDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextArea /> );
        driver  = wrapper.driver();
    } );

    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {  onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t blur since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t blur since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {  onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t focus since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t focus since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {  onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t click since it is disabled';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t click since it is read only';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( {  onChange } );

            driver.change( 'cba' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t change since it is disabled';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t change since it is read only';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
