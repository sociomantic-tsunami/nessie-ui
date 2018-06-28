/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React                   from 'react';
import { ReactWrapper, mount } from 'enzyme';

import { Radio }               from '../index';

import RadioGroup              from './index';

describe( 'RadioGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <RadioGroup /> );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).toHaveLength( 2 );
        } );

        test( 'should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).toBeInstanceOf( ReactWrapper ) );
        } );
    } );

    describe( 'selectByIndex()', () =>
    {
        test( 'should set Radio at index to checked when uncontrolled', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            wrapper.driver().selectByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();
        } );
    } );
    describe( 'toggleByIndex( index )', () =>
    {
        test( 'should toggle Radio with index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            wrapper.driver().toggleByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();

            wrapper.driver().toggleByIndex( 1 );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeFalsy();
        } );
    } );

    describe( 'selectByValue()', () =>
    {
        test( 'should set check to Radio with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().selectByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();
        } );
    } );

    describe( 'toggleByValue( value )', () =>
    {
        test( 'should toggle Radio with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().toggleByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();

            wrapper.driver().toggleByValue( 'second check' );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeFalsy();
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        test( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" isChecked />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'first check' ] );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
