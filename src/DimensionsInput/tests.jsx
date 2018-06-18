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

    beforeEach(() =>
    {
        wrapper  = shallow( <DimensionsInput /> );
        instance = wrapper.instance();
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name DimensionsInput', () =>
        {
            expect( instance.constructor.name ).toBe('DimensionsInput');
        });
    } );

    describe( 'handleFocus( e )', () =>
    {
        test('should call setState with { isFocused: true } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState.calledWith( sinon.match( { isFocused: true } ) ) ).toBe(true);
        });

        test('should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState.calledOnce ).toBe(true);
        });

        test('should set lastFocused property on instance', () =>
        {
            const input = document.createElement( 'input' );
            instance.handleFocus( { target: input } );

            expect( instance.lastFocused ).toBe(input);
        });

        test('should call onFocus with e', () =>
        {
            const onFocus = sinon.spy();
            const e = new Event( 'focus' );

            wrapper.setProps( { onFocus } );
            instance.handleFocus( e );

            expect( onFocus.calledWith( e ) ).toBe(true);
        });

        test('should call onFocus exactly once', () =>
        {
            const onFocus = sinon.spy();

            wrapper.setProps( { onFocus } );
            instance.handleFocus( new Event( 'focus' ) );

            expect( onFocus.calledOnce ).toBe(true);
        });

        test('shouldn’t call onFocus when relatedTarget is width <input>', () =>
        {
            const onFocus = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onFocus } );
            instance.widthInput = input;

            instance.handleFocus( e );

            expect( onFocus.called ).toBe(false);
        });

        test('shouldn’t call onFocus when relatedTarget is height <input>', () =>
        {
            const onFocus = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onFocus } );
            instance.heightInput = input;

            instance.handleFocus( e );

            expect( onFocus.called ).toBe(false);
        });

        test('should stopPropagation when relatedTarget is width <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.widthInput = input;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).toBe(true);
        });

        test('should stopPropagation when relatedTarget is height <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.heightInput = input;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).toBe(true);
        });

        test('shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'focus' );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleFocus( e );

            expect( stopPropagation.called ).toBe(false);
        });
    } );

    describe( 'handleBlur( e )', () =>
    {
        test('should call setState with { isFocused: false } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );

            instance.handleBlur( new Event( 'blur' ) );

            expect( setState.calledWith( sinon.match( { isFocused: false } ) ) ).toBe(true);
        });

        test('should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleBlur( new Event( 'blur' ) );

            expect( setState.calledOnce ).toBe(true);
        });

        test('should call onBlur with e', () =>
        {
            const onBlur = sinon.spy();
            const e = new Event( 'blur' );

            wrapper.setProps( { onBlur } );
            instance.handleBlur( e );

            expect( onBlur.calledWith( e ) ).toBe(true);
        });

        test('should call onBlur exactly once', () =>
        {
            const onBlur = sinon.spy();

            wrapper.setProps( { onBlur } );
            instance.handleBlur( new Event( 'blur' ) );

            expect( onBlur.calledOnce ).toBe(true);
        });

        test('shouldn’t call onBlur when relatedTarget is width <input>', () =>
        {
            const onBlur = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.widthInput = input;

            instance.handleBlur( e );

            expect( onBlur.called ).toBe(false);
        });

        test('shouldn’t call onBlur when relatedTarget is height <input>', () =>
        {
            const onBlur = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.heightInput = input;

            instance.handleBlur( e );

            expect( onBlur.called ).toBe(false);
        });

        test('should stopPropagation when relatedTarget is width <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.widthInput = input;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).toBe(true);
        });

        test('should stopPropagation when relatedTarget is height <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.heightInput = input;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).toBe(true);
        });

        test('shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'blur' );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleBlur( e );

            expect( stopPropagation.called ).toBe(false);
        });
    } );

    describe( 'render()', () =>
    {
        test('should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength(1);
        });

        test('should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength(1);
        });

        test('should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength(2);
        });
    } );
} );
