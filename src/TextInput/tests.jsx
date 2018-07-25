/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { InputField }     from '../index';
import InputContainer     from '../proto/InputContainer';

import TextInput          from './index';


describe( 'TextInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name TextInput', () =>
        {
            expect( instance.constructor.name ).toBe( 'TextInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );
    } );
} );


describe( 'TextInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextInput /> );
        driver  = wrapper.driver();
    } );

    describe( 'blur()', () =>
    {
        test( 'should fire the onBlur callback prop', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy,
            } );

            driver.blur();
            expect( blurSpy ).toBeCalled();
        } );
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy ).toBeCalled();
        } );
    } );

    describe( 'keyPress()', () =>
    {
        test( 'keyPress Text input should fire an event', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( { onKeyPress: keyPressSpy } );

            driver.keyPress();
            expect( keyPressSpy ).toBeCalled();
        } );

        test( 'keyPress Text input should fire an onChange event', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( { onChange: onChangeSpy } );

            driver.keyPress();
            expect( onChangeSpy ).toBeCalled();
        } );
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback once', () =>
        {
            const clickSpy = jest.fn();
            wrapper.setProps( {
                onClick : clickSpy,
            } );

            driver.click();

            expect( clickSpy ).toBeCalledTimes( 1 );
        } );
    } );
} );
