/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/

import React                            from 'react';
import { ReactWrapper, mount, shallow } from 'enzyme';

import InputContainer                   from '../proto/InputContainer';
import Css                              from '../hoc/Css';

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
        it( 'should have name FlounderDropdown', () =>
        {
            expect( instance.constructor.name ).to.equal( 'FlounderDropdown' );
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
            value : 'pokemon1'
        },
        {
            text  : 'Jigglypuff',
            value : 'pokemon2'
        },
        {
            text  : 'Squirtle',
            value : 'pokemon3'
        },
        {
            text  : 'Balbasaur',
            value : 'pokemon4'
        }
    ];

    beforeEach( () =>
    {
        wrapper = mount( <FlounderDropdown /> );
        driver  = wrapper.driver();
    } );

    describe( 'chooseItemByIndex( index )', () =>
    {
        it( 'should choose an item by index when Flounder is uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : [ 'Pikachu', 'Jigglypuff', 'Squirtle', 'Balbasaur' ],
                onChange : changeSpy
            } );

            driver.chooseItemByIndex( 2 );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 1 );
            expect( selected ).to.contain( 'Jigglypuff' );
            expect( changeSpy.calledOnce ).to.be.true;
        } );

        it( 'should choose multiple items by index when uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : [ 'Pikachu', 'Jigglypuff', 'Squirtle', 'Balbasaur' ],
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByIndex( [ 2, 4 ] );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 2 );
            expect( selected ).to.contain( 'Jigglypuff' );
            expect( selected ).to.contain( 'Balbasaur' );
            expect( changeSpy.calledTwice ).to.be.true;
        } );

        it( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByIndex( 0 ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is read-only' );
        } );

        it( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByIndex( 0 ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is disabled' );
        } );
    } );

    describe( 'chooseItemByText( text )', () =>
    {
        it( 'should choose item by text when Flounder is uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy
            } );

            driver.chooseItemByText( 'Jigglypuff' );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 1 );
            expect( selected ).to.contain( 'pokemon2' );
            expect( changeSpy.calledOnce ).to.be.true;
        } );

        it( 'should choose multiple items by text when uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByText( [ 'Jigglypuff', 'Balbasaur' ] );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 2 );
            expect( selected ).to.contain( 'pokemon2' );
            expect( selected ).to.contain( 'pokemon4' );
            expect( changeSpy.calledTwice ).to.be.true;
        } );

        it( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByText( 'Pikachu' ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is read-only' );
        } );

        it( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByText( 'Pikachu' ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is disabled' );
        } );
    } );

    describe( 'chooseItemByValues( value )', () =>
    {
        it( 'should choose an item by value when Flounder is uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy
            } );

            driver.chooseItemByValue( 'pokemon2' );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 1 );
            expect( selected ).to.contain( 'pokemon2' );
            expect( changeSpy.calledOnce ).to.be.true;
        } );

        it( 'should choose multiple items by value when uncontolled', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByValue( [ 'pokemon1', 'pokemon3' ] );

            const selected = driver.getSelectedValues();

            expect( selected ).to.have.length( 2 );
            expect( selected ).to.contain( 'pokemon1' );
            expect( selected ).to.contain( 'pokemon3' );
            expect( changeSpy.calledTwice ).to.be.true;
        } );

        it( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByValue( 'pokemon1' ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is read-only' );
        } );

        it( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByValue( 'pokemon1' ) )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is disabled' );
        } );
    } );

    describe( 'removeAllTags()', () =>
    {
        it( 'should remove all tags from an uncontrolled Flounder', () =>
        {
            const changeSpy = sinon.spy();
            const props = {
                label        : 'Flounder Label',
                data         : pokemonList,
                onChange     : changeSpy,
                defaultValue : [ 'pokemon1', 'pokemon3' ],
                multiple     : true,
                multipleTags : true
            };

            wrapper = mount( <FlounderDropdown { ...props } /> );
            driver  = wrapper.driver();

            driver.removeAllTags();

            const selected = driver.getSelectedValues();
            expect( selected ).to.have.length( 0 );
            expect( changeSpy.callCount ).to.equal( 2 );
        } );

        it( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.removeAllTags() )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is read-only' );
        } );

        it( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.removeAllTags() )
                .to.throw( 'Cannot change the flounder dropdown value since it \
is disabled' );
        } );

        it( 'should throw error when not configured with multipleTags', () =>
        {
            wrapper.setProps( { data: pokemonList } );

            expect( () => wrapper.driver().removeAllTags() )
                .to.throw( 'Cannot deselect tags when flounder dropdown is not \
configured with multipleTags' );
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
                errorMessage          : <p className = "attack">Lightning</p>
            } );
        } );

        it( 'should return a Reactwrapper', () =>
        {
            expect( driver.getErrorMessage() ).to.be.instanceOf( ReactWrapper );
        } );

        it( 'should contain the error message content', () =>
        {
            const content = driver.getErrorMessage();
            expect( content.find( '.attack' ) ).to.have.length( 1 );
        } );
    } );
} );
