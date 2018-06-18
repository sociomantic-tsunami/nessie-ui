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

    beforeEach(() =>
    {
        wrapper = mount( <RadioGroup /> );
    });

    describe( 'getContent()', () =>
    {
        test('should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).toHaveLength(2);
        });

        test('should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).toBeInstanceOf(ReactWrapper)
            );
        });
    } );

    describe( 'selectByIndex()', () =>
    {
        test('should set Radio at index to checked when uncontrolled', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            wrapper.driver().selectByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(true);
        });
    } );
    describe( 'toggleByIndex( index )', () =>
    {
        test('should toggle Radio with index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            wrapper.driver().toggleByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(true);

            wrapper.driver().toggleByIndex( 1 );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(false);
        });
    } );

    describe( 'selectByValue()', () =>
    {
        test('should set check to Radio with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().selectByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(true);
        });
    } );

    describe( 'toggleByValue( value )', () =>
    {
        test('should toggle Radio with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().toggleByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(true);

            wrapper.driver().toggleByValue( 'second check' );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() ).toBe(false);
        });
    } );

    describe( 'getSelectedValues()', () =>
    {
        test('should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" isChecked />,
                    <Radio label = "two" value = "second check" />
                ],
            } );

            expect( wrapper.driver().getSelectedValues() ).toEqual([ 'first check' ]);
        });
    } );

    describe( 'mouseOver()', () =>
    {
        test('should call onMouseOver once', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );


    describe( 'mouseOut()', () =>
    {
        test('should call onMouseOut once', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );
} );
