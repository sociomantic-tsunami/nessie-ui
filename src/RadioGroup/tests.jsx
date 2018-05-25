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
        it( 'should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).to.have.length( 2 );
        } );

        it( 'should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" />,
                    <Radio label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).to.be.instanceOf( ReactWrapper )
            );
        } );
    } );

    describe( 'selectByIndex()', () =>
    {
        xit( 'should simulate check on Radio at index', () =>
        {
        } );

        it( 'should set Radio at index to checked when uncontrolled', () =>
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
                .to.be.true;
        } );
    } );
    describe( 'toggleByIndex( index )', () =>
    {
        it( 'should toggle Radio with index', () =>
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
                .to.be.true;

            wrapper.driver().toggleByIndex( 1 );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .to.be.false;
        } );
    } );

    describe( 'selectByValue()', () =>
    {
        it( 'should set check to Radio with value', () =>
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
                .to.be.true;
        } );
    } );

    describe( 'toggleByValue( value )', () =>
    {
        it( 'should toggle Radio with value', () =>
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
                .to.be.true;

            wrapper.driver().toggleByValue( 'second check' );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .to.be.false;
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        it( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Radio label = "one" value = "first check" isChecked />,
                    <Radio label = "two" value = "second check" />
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
