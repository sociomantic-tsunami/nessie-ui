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
        it( 'should have name DimensionsInput', () =>
        {
            expect( instance.constructor.name ).to.equal( 'DimensionsInput' );
        } );
    } );

    describe( 'handleFocus( e )', () =>
    {
        it( 'should call setState with { isFocused: true } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState.calledWith( sinon.match( { isFocused: true } ) ) )
                .to.be.true;
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocus( new Event( 'focus' ) );

            expect( setState.calledOnce ).to.be.true;
        } );

        it( 'should set lastFocused property on instance', () =>
        {
            const input = document.createElement( 'input' );
            instance.handleFocus( { target: input } );

            expect( instance.lastFocused ).to.equal( input );
        } );

        it( 'should call onFocus with e', () =>
        {
            const onFocus = sinon.spy();
            const e = new Event( 'focus' );

            wrapper.setProps( { onFocus } );
            instance.handleFocus( e );

            expect( onFocus.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onFocus exactly once', () =>
        {
            const onFocus = sinon.spy();

            wrapper.setProps( { onFocus } );
            instance.handleFocus( new Event( 'focus' ) );

            expect( onFocus.calledOnce ).to.be.true;
        } );

        it( 'shouldn’t call onFocus when relatedTarget is width <input>', () =>
        {
            const onFocus = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onFocus } );
            instance.widthInput = input;

            instance.handleFocus( e );

            expect( onFocus.called ).to.be.false;
        } );

        it( 'shouldn’t call onFocus when relatedTarget is height <input>', () =>
        {
            const onFocus = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onFocus } );
            instance.heightInput = input;

            instance.handleFocus( e );

            expect( onFocus.called ).to.be.false;
        } );

        it( 'should stopPropagation when relatedTarget is width <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.widthInput = input;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should stopPropagation when relatedTarget is height <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'focus' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.heightInput = input;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'focus' );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleFocus( e );

            expect( stopPropagation.called ).to.be.false;
        } );
    } );

    describe( 'handleBlur( e )', () =>
    {
        it( 'should call setState with { isFocused: false } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );

            instance.handleBlur( new Event( 'blur' ) );

            expect( setState.calledWith( sinon.match( { isFocused: false } ) ) )
                .to.be.true;
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleBlur( new Event( 'blur' ) );

            expect( setState.calledOnce ).to.be.true;
        } );

        it( 'should call onBlur with e', () =>
        {
            const onBlur = sinon.spy();
            const e = new Event( 'blur' );

            wrapper.setProps( { onBlur } );
            instance.handleBlur( e );

            expect( onBlur.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onBlur exactly once', () =>
        {
            const onBlur = sinon.spy();

            wrapper.setProps( { onBlur } );
            instance.handleBlur( new Event( 'blur' ) );

            expect( onBlur.calledOnce ).to.be.true;
        } );

        it( 'shouldn’t call onBlur when relatedTarget is width <input>', () =>
        {
            const onBlur = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.widthInput = input;

            instance.handleBlur( e );

            expect( onBlur.called ).to.be.false;
        } );

        it( 'shouldn’t call onBlur when relatedTarget is height <input>', () =>
        {
            const onBlur = sinon.spy();
            const input   = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.heightInput = input;

            instance.handleBlur( e );

            expect( onBlur.called ).to.be.false;
        } );

        it( 'should stopPropagation when relatedTarget is width <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.widthInput = input;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should stopPropagation when relatedTarget is height <input>', () =>
        {
            const input = document.createElement( 'input' );

            const e = new Event( 'blur' );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.heightInput = input;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'shouldn’t stopPropagation if relatedTarget not an input', () =>
        {
            const e = new Event( 'blur' );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleBlur( e );

            expect( stopPropagation.called ).to.be.false;
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).to.have.length( 2 );
        } );
    } );
} );
