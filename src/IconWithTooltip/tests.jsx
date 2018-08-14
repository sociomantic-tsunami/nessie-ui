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
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).toBeUndefined();
            } );

            test(
                'should be be passed to the wrapper div as onMouseEnter',
                () =>
                {
                    const onMouseOver = jest.fn();
                    wrapper.setProps( { onMouseOver } );

                    expect( wrapper.find( 'div' ).first()
                        .prop( 'onMouseEnter' ) ).toBe( onMouseOver );
                },
            );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).toBeUndefined();
            } );

            test(
                'should be be passed to the wrapper div as onMouseLeave',
                () =>
                {
                    const onMouseOut = jest.fn();
                    wrapper.setProps( { onMouseOut } );

                    expect( wrapper.find( 'div' ).first()
                        .prop( 'onMouseLeave' ) ).toBe( onMouseOut );
                },
            );
        } );

        describe( 'onMouseOverIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOverIcon ).toBeUndefined();
            } );

            test( 'should be be passed to the Tooltip as onMouseOver', () =>
            {
                const onMouseOverIcon = jest.fn();
                wrapper.setProps( { onMouseOverIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOver' ) )
                    .toBe( onMouseOverIcon );
            } );
        } );

        describe( 'onMouseOutIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOutIcon ).toBeUndefined();
            } );

            test( 'should be be passed to the Tooltip as onMouseOut', () =>
            {
                const onMouseOutIcon = jest.fn();
                wrapper.setProps( { onMouseOutIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOut' ) )
                    .toBe( onMouseOutIcon );
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
        test( 'should call onMouseOver prop exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut prop exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOverIcon()', () =>
    {
        test( 'should call onMouseOverIcon prop exactly once', () =>
        {
            const onMouseOverIcon = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOverIcon } );

            driver.mouseOverIcon();

            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOutIcon()', () =>
    {
        test( 'should call onMouseOutIcon prop exactly once', () =>
        {
            const onMouseOutIcon = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOutIcon } );

            driver.mouseOutIcon();

            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return a Reactwrapper', () =>
        {
            expect( driver.getContent() ).toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the wrapped content', () =>
        {
            wrapper.setProps( {
                message  : 'Pikachu!',
                children : <h1>Who am i?</h1>,
            } );

            const content = driver.getContent();
            expect( content.find( 'h1' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'getMessage()', () =>
    {
        test( 'should return a Reactwrapper', () =>
        {
            expect( driver.getMessage() ).toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the Tooltip message', () =>
        {
            wrapper.setProps( {
                message          : <h2>Pikachu!</h2>,
                tooltipIsVisible : true,
            } );

            const message = driver.getMessage();
            expect( message.find( 'h2' ) ).toHaveLength( 1 );
        } );
    } );
} );
