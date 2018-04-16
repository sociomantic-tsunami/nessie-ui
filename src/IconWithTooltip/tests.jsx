/* eslint-disable no-magic-numbers, no-unused-expressions */

import React                            from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';

import { Tooltip }                      from '../index';

import IconWithTooltip                  from './index';


describe( 'IconWithTooltip', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <IconWithTooltip /> );
        instance = wrapper.instance();
    } );

    describe( 'props', () =>
    {
        describe( 'onMouseOver', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).to.be.undefined;
            } );

            it( 'should be be passed to the wrapper div as onMouseEnter', () =>
            {
                const onMouseOver = sinon.spy();
                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( 'div' ).first().prop( 'onMouseEnter' ) )
                    .to.equal( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).to.be.undefined;
            } );

            it( 'should be be passed to the wrapper div as onMouseLeave', () =>
            {
                const onMouseOut = sinon.spy();
                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( 'div' ).first().prop( 'onMouseLeave' ) )
                    .to.equal( onMouseOut );
            } );
        } );

        describe( 'onMouseOverIcon', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOverIcon ).to.be.undefined;
            } );

            it( 'should be be passed to the Tooltip as onMouseOver', () =>
            {
                const onMouseOverIcon = sinon.spy();
                wrapper.setProps( { onMouseOverIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOver' ) )
                    .to.equal( onMouseOverIcon );
            } );
        } );

        describe( 'onMouseOutIcon', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOutIcon ).to.be.undefined;
            } );

            it( 'should be be passed to the Tooltip as onMouseOut', () =>
            {
                const onMouseOutIcon = sinon.spy();
                wrapper.setProps( { onMouseOutIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOut' ) )
                    .to.equal( onMouseOutIcon );
            } );
        } );
    } );
} );


describe( 'IconWithTooltipDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <IconWithTooltip /> );
        driver  = wrapper.driver();
    } );

    describe( 'mouseOver()', () =>
    {
        it( 'should call onMouseOver prop exactly once', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { message: 'Pikachu!', onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        it( 'should call onMouseOut prop exactly once', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { message: 'Pikachu!', onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOverIcon()', () =>
    {
        it( 'should call onMouseOverIcon prop exactly once', () =>
        {
            const onMouseOverIcon = sinon.spy();
            wrapper.setProps( { message: 'Pikachu!', onMouseOverIcon } );

            driver.mouseOverIcon();

            expect( onMouseOverIcon.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOutIcon()', () =>
    {
        it( 'should call onMouseOutIcon prop exactly once', () =>
        {
            const onMouseOutIcon = sinon.spy();
            wrapper.setProps( { message: 'Pikachu!', onMouseOutIcon } );

            driver.mouseOutIcon();

            expect( onMouseOutIcon.calledOnce ).to.be.true;
        } );
    } );

    describe( 'getContent()', () =>
    {
        it( 'should return a Reactwrapper', () =>
        {
            expect( driver.getContent() ).to.be.instanceOf( ReactWrapper );
        } );

        it( 'should contain the wrapped content', () =>
        {
            wrapper.setProps( {
                message  : 'Pikachu!',
                children : <h1>Who am i?</h1>
            } );

            const content = driver.getContent();
            expect( content.find( 'h1' ) ).to.have.length( 1 );
        } );
    } );

    describe( 'getMessage()', () =>
    {
        it( 'should return a Reactwrapper', () =>
        {
            expect( driver.getMessage() ).to.be.instanceOf( ReactWrapper );
        } );

        it( 'should contain the Tooltip message', () =>
        {
            wrapper.setProps( {
                message          : <h2>Pikachu!</h2>,
                tooltipIsVisible : true,
            } );

            const message = driver.getMessage();
            expect( message.find( 'h2' ) ).to.have.length( 1 );
        } );
    } );
} );
