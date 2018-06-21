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

    beforeEach(() =>
    {
        wrapper  = shallow( <FlounderDropdown /> );
        instance = wrapper.instance();
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name FlounderDropdown', () =>
        {
            expect( instance.constructor.name ).toBe('FlounderDropdown');
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

    beforeEach(() =>
    {
        wrapper = mount( <FlounderDropdown /> );
        driver  = wrapper.driver();
    });

    describe( 'chooseItemByIndex( index )', () =>
    {
        test('should choose an item by index when Flounder is uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : [ 'Pikachu', 'Jigglypuff', 'Squirtle', 'Balbasaur' ],
                onChange : changeSpy
            } );

            driver.chooseItemByIndex( 1 );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(1);
            expect( selected ).toContain('Jigglypuff');
            expect( changeSpy.calledOnce ).toBe(true);
        });

        test('should choose multiple items by index when uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : [ 'Pikachu', 'Jigglypuff', 'Squirtle', 'Balbasaur' ],
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByIndex( [ 1, 3 ] );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(2);
            expect( selected ).toContain('Jigglypuff');
            expect( selected ).toContain('Balbasaur');
            expect( changeSpy.calledTwice ).toBe(true);
        });

        test('should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByIndex( 0 ) ).toThrowError('Cannot change the flounder dropdown value since it \
is read-only');
        });

        test('should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByIndex( 0 ) ).toThrowError('Cannot change the flounder dropdown value since it \
is disabled');
        });
    } );

    describe( 'chooseItemByText( text )', () =>
    {
        test('should choose item by text when Flounder is uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy
            } );

            driver.chooseItemByText( 'Jigglypuff' );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(1);
            expect( selected ).toContain('pokemon2');
            expect( changeSpy.calledOnce ).toBe(true);
        });

        test('should choose multiple items by text when uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByText( [ 'Jigglypuff', 'Balbasaur' ] );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(2);
            expect( selected ).toContain('pokemon2');
            expect( selected ).toContain('pokemon4');
            expect( changeSpy.calledTwice ).toBe(true);
        });

        test('should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByText( 'Pikachu' ) ).toThrowError('Cannot change the flounder dropdown value since it \
is read-only');
        });

        test('should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByText( 'Pikachu' ) ).toThrowError('Cannot change the flounder dropdown value since it \
is disabled');
        });
    } );

    describe( 'chooseItemByValues( value )', () =>
    {
        test('should choose an item by value when Flounder is uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy
            } );

            driver.chooseItemByValue( 'pokemon2' );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(1);
            expect( selected ).toContain('pokemon2');
            expect( changeSpy.calledOnce ).toBe(true);
        });

        test('should choose multiple items by value when uncontolled', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                label    : 'Flounder Label',
                data     : pokemonList,
                onChange : changeSpy,
                multiple : true
            } );

            driver.chooseItemByValue( [ 'pokemon1', 'pokemon3' ] );

            const selected = driver.getSelectedValues();

            expect( selected ).toHaveLength(2);
            expect( selected ).toContain('pokemon1');
            expect( selected ).toContain('pokemon3');
            expect( changeSpy.calledTwice ).toBe(true);
        });

        test('should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByValue( 'pokemon1' ) ).toThrowError('Cannot change the flounder dropdown value since it \
is read-only');
        });

        test('should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.chooseItemByValue( 'pokemon1' ) ).toThrowError('Cannot change the flounder dropdown value since it \
is disabled');
        });
    } );

    describe( 'removeAllTags()', () =>
    {
        test('should remove all tags from an uncontrolled Flounder', () =>
        {
            const changeSpy = jest.fn();
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
            expect( selected ).toHaveLength(0);
            expect( changeSpy.callCount ).toBe(2);
        });

        test('should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => driver.removeAllTags() ).toThrowError('Cannot change the flounder dropdown value since it \
is read-only');
        });

        test('should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => driver.removeAllTags() ).toThrowError('Cannot change the flounder dropdown value since it \
is disabled');
        });

        test('should throw error when not configured with multipleTags', () =>
        {
            wrapper.setProps( { data: pokemonList } );

            expect( () => wrapper.driver().removeAllTags() ).toThrowError('Cannot deselect tags when flounder dropdown is not \
configured with multipleTags');
        });
    } );

    describe( 'getErrorMessage()', () =>
    {
        beforeEach(() =>
        {
            wrapper.setProps( {
                label                 : 'Flounder Label',
                data                  : pokemonList,
                value                 : [ 'pokemon1', 'pokemon3' ],
                hasError              : true,
                errorMessageIsVisible : true,
                errorMessage          : <p className = "attack">Lightning</p>
            } );
        });

        test('should return a Reactwrapper', () =>
        {
            expect( driver.getErrorMessage() ).toBeInstanceOf(ReactWrapper);
        });

        test('should contain the error message content', () =>
        {
            const content = driver.getErrorMessage();
            expect( content.find( '.attack' ) ).toHaveLength(1);
        });
    } );
} );
