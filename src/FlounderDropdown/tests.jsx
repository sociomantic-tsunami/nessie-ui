/* global test jest */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import InputContainer       from '../proto/InputContainer';

import FlounderDropdown     from './index';


describe( 'FlounderDropdown', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <FlounderDropdown /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name FlounderDropdown', () =>
        {
            expect( instance.constructor.name ).toBe( 'FlounderDropdown' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );
    } );
} );


describe( 'FlounderDropdownDriver', () =>
{
    let wrapper;
    let driver;

    const pokemonList = [
        'Option',
        {
            text  : 'Pikachu',
            value : 'pokemon1',
        },
        {
            text  : 'Jigglypuff',
            value : 'pokemon2',
        },
        {
            text  : 'Squirtle',
            value : 'pokemon3',
        },
        {
            text  : 'Balbasaur',
            value : 'pokemon4',
        },
    ];

    beforeEach( () =>
    {
        wrapper = mount( <FlounderDropdown /> );
        driver  = wrapper.driver();
    } );


    describe( 'change( value )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange, children: pokemonList } );

            driver.change( 'a' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'close()', () =>
    {
        test( 'should trigger onClose callback prop once', () =>
        {
            const onClose = jest.fn();
            wrapper.setProps( { onClose } );

            driver.close();
            expect( onClose ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'firstTouch()', () =>
    {
        test( 'should trigger onFirstTouch callback prop once', () =>
        {
            const onFirstTouch = jest.fn();
            wrapper.setProps( { children: pokemonList, onFirstTouch } );

            driver.firstTouch();
            expect( onFirstTouch ).toBeCalledTimes( 1 );
        } );

        test( 'should be called with \'touch\' as argument', () =>
        {
            const onFirstTouch = jest.fn();
            wrapper.setProps( { children: pokemonList, onFirstTouch } );

            driver.firstTouch();
            expect( onFirstTouch ).toBeCalledWith( 'touch' );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );

        test( 'should be called with \'focus\' as argument', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { children: pokemonList, onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledWith( 'focus' );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );

        test( 'should be called with \'blur\' as argument', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { children: pokemonList, onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledWith( 'blur' );
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

        test( 'should be called with \'mouseenter\' as argument', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { children: pokemonList, onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledWith( 'mouseenter' );
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

        test( 'should be called with \'mouseleave\' as argument', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { children: pokemonList, onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledWith( 'mouseleave' );
        } );
    } );
} );
