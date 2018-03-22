/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React                   from 'react';
import { ReactWrapper, mount } from 'enzyme';

import { Checkbox }            from '../index';

import CheckableGroup          from './index';

describe( 'CheckboxDriver', () =>
{
    let wrapper;
    let cssMap;

    beforeEach( () =>
    {
        wrapper = mount( <CheckableGroup /> );
        cssMap = wrapper.prop( 'cssMap' );
    } );

    describe( 'getContent()', () =>
    {
        it( 'should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).to.have.length( 2 );
        } );

        it( 'should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).to.be.instanceOf( ReactWrapper )
            );
        } );
    } );

    describe( 'selectByIndex()', () =>
    {
        xit( 'should simulate check on Checkbox at index', () =>
        {
        } );

        it( 'should set Checkbox at index to checked when uncontrolled', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            wrapper.driver().selectByIndex( 1 );
            const items = wrapper.find( `.${cssMap.listItem}` );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .to.be.true;
        } );
    } );

    describe( 'selectByValue()', () =>
    {
        it( 'should set check to Checkbox with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().selectByValue( 'second check' );
            const items = wrapper.find( `.${cssMap.listItem}` );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .to.be.true;
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        it( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" isChecked />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            expect( wrapper.driver().getSelectedValues() )
                .to.eql( [ 'first check' ] );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        it( 'should call onMouseOver once', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        it( 'should call onMouseOut once', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );
} );
