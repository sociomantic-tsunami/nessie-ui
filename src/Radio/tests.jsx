/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-unused-expressions */

import React                from 'react';
import { shallow, mount }   from 'enzyme';

import Checkable            from '../proto/Checkable';

import Radio                from './index';


describe( 'Radio', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Radio /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .to.be.true;
            } );
        } );

        describe( 'hasError', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .to.be.true;
            } );
        } );

        describe( 'forceHover', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .to.be.true;
            } );
        } );
    } );
} );


describe.only( 'RadioDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Radio /> );
    } );

    describe( 'focus()', () =>
    {
        it( 'should call onFocus once', () =>
        {
            const onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );


    describe( 'blur()', () =>
    {
        it( 'should call onFocus once', () =>
        {
            const onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );


    describe( 'setChecked()', () =>
    {
        it( 'should call onChange once', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().setChecked();

            expect( onChange.calledOnce ).to.be.true;
        } );

        it( 'should be called with checked as true', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().setChecked();

            expect( onChange.lastCall.args[ 0 ].target.checked ).to.be.true;
        } );
    } );


    describe( 'setUnchecked()', () =>
    {
        it( 'should call onChange once', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().setUnchecked();

            expect( onChange.calledOnce ).to.be.true;
        } );

        it( 'should be called with checked as false', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().setUnchecked();

            expect( onChange.lastCall.args[ 0 ].target.checked ).to.be.false;
        } );
    } );


    describe( 'toggleChecked()', () =>
    {
        it( 'should call onChange once', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().toggleChecked();

            expect( onChange.calledOnce ).to.be.true;
        } );

        it( 'should toggle the value of checked', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange, isChecked: true } );

            wrapper.driver().toggleChecked();

            expect( onChange.lastCall.args[ 0 ].target.checked ).to.be.false;
        } );
    } );


    describe( 'click()', () =>
    {
        it( 'should call onClick once', () =>
        {
            const onClick = sinon.spy();

            wrapper.setProps( { onClick } );
            wrapper.driver().click();

            expect( onClick.calledOnce ).to.be.true;
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
