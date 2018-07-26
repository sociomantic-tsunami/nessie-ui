/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React            from 'react';
import { mount }        from 'enzyme';

import { Checkbox }     from '../index';

import CheckableGroup   from './index';

describe( 'CheckableGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <CheckableGroup /> );
    } );


    describe( 'toggleByIndex( index )', () =>
    {
        test( 'should toggle Checkbox with index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />,
                ],
            } );
            wrapper.driver().toggleByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).find( 'input' ).getNode().checked )
                .toBeTruthy();

            wrapper.driver().toggleByIndex( 1 );
            expect( items.at( 1 ).childAt( 0 ).find( 'input' ).getNode().checked )
                .toBe( false );
        } );

        test( 'should toggle Checkboxes with indexes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                    <Checkbox label = "three" value = "third check" />,
                    <Checkbox label = "four" value = "fourth check" />,
                ],
            } );
            wrapper.driver().toggleByIndex( [ 1, 3 ] );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'second check', 'fourth check' ] );

            wrapper.driver().toggleByIndex( [ 1, 3 ] );

            expect( wrapper.driver().getSelectedValues() ).toEqual( [] );
        } );
    } );


    describe( 'toggleByValue( value )', () =>
    {
        test( 'should toggle Checkbox with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                ],
            } );

            wrapper.driver().toggleByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).find( 'input' ).getNode().checked )
                .toBeTruthy();

            wrapper.driver().toggleByValue( 'second check' );
            expect( items.at( 1 ).childAt( 0 ).find( 'input' ).getNode().checked )
                .toBe( false );
        } );

        test( 'should toggle Checkboxes with values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                    <Checkbox label = "three" value = "third check" />,
                    <Checkbox label = "four" value = "fourth check" />,
                ],
            } );

            wrapper.driver().toggleByValue( [ 'second check', 'third check' ] );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'second check', 'third check' ] );

            wrapper.driver().toggleByValue( [ 'second check', 'third check' ] );

            expect( wrapper.driver().getSelectedValues() ).toEqual( [] );
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        test( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" isChecked />,
                    <Checkbox label = "two" value = "second check" />,
                ],
            } );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'first check' ] );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
