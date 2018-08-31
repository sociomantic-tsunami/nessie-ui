/* global test */

import React                            from 'react';
import { ReactWrapper, mount, shallow } from 'enzyme';

import InputContainer                   from '../../proto/InputContainer';

import FlounderDropdown                 from './index';


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
    } );

    describe( 'chooseItemByIndex( index )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByIndex( 0 ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByIndex( 0 ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'chooseItemByText( text )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByText( 'Pikachu' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByText( 'Pikachu' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'chooseItemByValues( value )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByValue( 'pokemon1' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByValue( 'pokemon1' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'removeAllTags()', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );

        test( 'should throw error when not configured with multipleTags', () =>
        {
            wrapper.setProps( { data: pokemonList } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot deselect tags when flounder dropdown \
is not configured with multipleTags' );
        } );
    } );

    describe( 'getErrorMessage()', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( {
                label                 : 'Flounder Label',
                data                  : pokemonList,
                value                 : [ 'pokemon1', 'pokemon3' ],
                hasError              : true,
                errorMessageIsVisible : true,
                errorMessage          : <p className = "attack">Lightning</p>,
            } );
        } );

        test( 'should return a Reactwrapper', () =>
        {
            expect( wrapper.driver().getErrorMessage() ).toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the error message content', () =>
        {
            const content = wrapper.driver().getErrorMessage();
            expect( content.find( '.attack' ) ).toHaveLength( 1 );
        } );
    } );
} );
