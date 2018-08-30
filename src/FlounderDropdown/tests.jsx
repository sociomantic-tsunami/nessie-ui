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


    describe( 'change( val )', () =>
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


    describe( 'open()', () =>
    {
        test( 'should trigger onOpen callback prop once', () =>
        {
            const onOpen = jest.fn();
            wrapper.setProps( { onOpen } );

            driver.open();
            expect( onOpen ).toBeCalledTimes( 1 );
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
