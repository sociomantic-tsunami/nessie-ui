/* eslint-env node, mocha */
/* global document Event expect */
/* eslint-disable no-magic-numbers */


import React           from 'react';
import { shallow }     from 'enzyme';

import { InputField }  from '../index';
import InputContainer  from '../proto/InputContainer';
import Css             from '../hoc/Css';

import DimensionsInput from './index';


describe( 'DimensionsInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <DimensionsInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name DimensionsInput', () =>
        {
            expect( instance.constructor.name ).toBe( 'DimensionsInput' );
        } );
    } );

    describe( 'handleFocus( e )', () =>
    {
        test( 'should call setState with { isFocused: true } }', () =>
        {
            const setState = jest.spyOn( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState ).toBeCalledWith( { isFocused: true } );
        } );

        test( 'should call setState exactly once', () =>
        {
            const setState = jest.spyOn( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState ).toBeCalledTimes( 1 );
        } );

        test( 'should set lastFocused property on instance', () =>
        {
            const input = document.createElement( 'input' );
            instance.handleFocus( { target: input } );

            expect( instance.lastFocused ).toBe( input );
        } );

        test( 'should call onFocus with e', () =>
        {
            const onFocus = jest.fn();
            const e = new Event( 'focus' );

            wrapper.setProps( { onFocus } );
            instance.handleFocus( e );

            expect( onFocus ).toBeCalledWith( e );
        } );

        test( 'should call onFocus exactly once', () =>
        {
            const onFocus = jest.fn();

            wrapper.setProps( { onFocus } );
            instance.handleFocus( new Event( 'focus' ) );

            expect( onFocus ).toBeCalledTimes( 1 );
        } );

        test(
            'shouldn’t call onFocus when relatedTarget is width <input>',
            () =>
            {
                const onFocus = jest.fn();
                const input   = document.createElement( 'input' );

                const e = new Event( 'focus' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );

                wrapper.setProps( { onFocus } );
                instance.widthInput = input;

                instance.handleFocus( e );

                expect( onFocus ).not.toBeCalled();
            }
        );

        test(
            'shouldn’t call onFocus when relatedTarget is height <input>',
            () =>
            {
                const onFocus = jest.fn();
                const input   = document.createElement( 'input' );

                const e = new Event( 'focus' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );

                wrapper.setProps( { onFocus } );
                instance.heightInput = input;

                instance.handleFocus( e );

                expect( onFocus ).not.toBeCalled();
            }
        );

        test(
            'should stopPropagation when relatedTarget is width <input>',
            () =>
            {
                const input = document.createElement( 'input' );

                const e = new Event( 'focus' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );
                const stopPropagation = jest.spyOn( e, 'stopPropagation' );

                instance.widthInput = input;

                instance.handleFocus( e );

                expect( stopPropagation ).toBeCalled();
            }
        );

        test(
            'should stopPropagation when relatedTarget is height <input>',
            () =>
            {
                const input = document.createElement( 'input' );

                const e = new Event( 'focus' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );
                const stopPropagation = jest.spyOn( e, 'stopPropagation' );

                instance.heightInput = input;

                instance.handleFocus( e );

                expect( stopPropagation ).toBeCalled();
            }
        );

        test( 'shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'focus' );
            const stopPropagation = jest.spyOn( e, 'stopPropagation' );

            instance.handleFocus( e );

            expect( stopPropagation ).not.toBeCalled();
        } );
    } );

    describe( 'handleBlur( e )', () =>
    {
        test( 'should call setState with { isFocused: false } }', () =>
        {
            const setState = jest.spyOn( instance, 'setState' );

            instance.handleBlur( new Event( 'blur' ) );

            expect( setState ).toBeCalledWith( { isFocused: false } );
        } );

        test( 'should call setState exactly once', () =>
        {
            const setState = jest.spyOn( instance, 'setState' );
            instance.handleBlur( new Event( 'blur' ) );

            expect( setState ).toBeCalledTimes( 1 );
        } );

        test( 'should call onBlur with e', () =>
        {
            const onBlur = jest.fn();
            const e = new Event( 'blur' );

            wrapper.setProps( { onBlur } );
            instance.handleBlur( e );

            expect( onBlur ).toBeCalledWith( e );
        } );

        test( 'should call onBlur exactly once', () =>
        {
            const onBlur = jest.fn();

            wrapper.setProps( { onBlur } );
            instance.handleBlur( new Event( 'blur' ) );

            expect( onBlur ).toBeCalledTimes( 1 );
        } );

        test( 'shouldn’t call onBlur when relatedTarget is width <input>', () =>
        {
            const onBlur = jest.fn();
            const input   = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.widthInput = input;

            instance.handleBlur( e );

            expect( onBlur ).not.toBeCalled();
        } );

        test(
            'shouldn’t call onBlur when relatedTarget is height <input>',
            () =>
            {
                const onBlur = jest.fn();
                const input   = document.createElement( 'input' );

                const e = new Event( 'blur' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );

                wrapper.setProps( { onBlur } );
                instance.heightInput = input;

                instance.handleBlur( e );

                expect( onBlur ).not.toBeCalled();
            }
        );

        test(
            'should stopPropagation when relatedTarget is width <input>',
            () =>
            {
                const input = document.createElement( 'input' );

                const e = new Event( 'blur' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );
                const stopPropagation = jest.spyOn( e, 'stopPropagation' );

                instance.widthInput = input;

                instance.handleBlur( e );

                expect( stopPropagation ).toBeCalled();
            }
        );

        test(
            'should stopPropagation when relatedTarget is height <input>',
            () =>
            {
                const input = document.createElement( 'input' );

                const e = new Event( 'blur' );
                Object.defineProperty( e, 'relatedTarget', { value: input } );
                const stopPropagation = jest.spyOn( e, 'stopPropagation' );

                instance.heightInput = input;

                instance.handleBlur( e );

                expect( stopPropagation ).toBeCalled();
            }
        );

        test( 'shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'blur' );
            const stopPropagation = jest.spyOn( e, 'stopPropagation' );

            instance.handleBlur( e );

            expect( stopPropagation ).not.toBeCalled();
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 2 );
        } );
    } );
} );
