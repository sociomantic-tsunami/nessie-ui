/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global test jest */

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
