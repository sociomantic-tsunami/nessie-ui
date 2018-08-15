/* eslint-disable no-magic-numbers, no-multi-str*/

import React                       from 'react';
import { mount, shallow }          from 'enzyme';


import { H2, H3, IconWithTooltip } from '../index';

import Module                      from './index';


describe( 'Module', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Module /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).toBe( 'Module' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should not contain a <header> by default', () =>
        {
            expect( wrapper.find( 'header' ) ).toHaveLength( 0 );
        } );

        test( 'should contain a <header> if title prop is set', () =>
        {
            wrapper.setProps( { title: 'Boom' } );
            expect( wrapper.find( 'header' ) ).toHaveLength( 1 );
        } );

        test( 'should contain a <header> if customHeader prop is set', () =>
        {
            wrapper.setProps( { customHeader: 'Boom' } );
            expect( wrapper.find( 'header' ) ).toHaveLength( 1 );
        } );

        test( 'should contain a H2 component by default when has title', () =>
        {
            wrapper.setProps( { title: 'Boom' } );
            expect( wrapper.find( H2 ) ).toHaveLength( 1 );
        } );

        test( 'should have a header corresponding to headerLevel prop', () =>
        {
            wrapper.setProps( {
                title       : 'Boom',
                headerLevel : 3,
            } );

            expect( wrapper.find( H3 ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'title', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.title ).toBeUndefined();
            } );

            test( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( { title: 'Boom' } );

                expect( wrapper.find( H2 ).prop( 'children' ) ).toBe( 'Boom' );
            } );
        } );

        describe( 'onMouseOutError', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOutError ).toBeUndefined();
            } );

            test( 'should be passed to the IconWithTooltip as onMouseOut', () =>
            {
                const onMouseOutError = jest.fn();
                wrapper.setProps( {
                    errorMessage : 'error!',
                    hasError     : true,
                    onMouseOutError,
                    title        : 'hello',
                } );

                expect( wrapper.find( IconWithTooltip ).prop( 'onMouseOut' ) )
                    .toBe( onMouseOutError );
            } );
        } );

        describe( 'onMouseOverError', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOverError ).toBeUndefined();
            } );

            test(
                'should be passed to the IconWithTooltip as onMouseOver',
                () =>
                {
                    const onMouseOverError = jest.fn();
                    wrapper.setProps( {
                        errorMessage : 'error!',
                        hasError     : true,
                        onMouseOverError,
                        title        : 'hello',
                    } );

                    expect( wrapper.find( IconWithTooltip )
                        .prop( 'onMouseOver' ) ).toBe( onMouseOverError );
                },
            );
        } );

        describe( 'onMouseOutHeader', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOutHeader ).toBeUndefined();
            } );

            test( 'should be passed to the <header> as onMouseOut', () =>
            {
                const onMouseOutHeader = jest.fn();
                wrapper.setProps( { onMouseOutHeader, title: 'hello' } );

                expect( wrapper.find( 'header' ).prop( 'onMouseOut' ) )
                    .toBe( onMouseOutHeader );
            } );
        } );

        describe( 'onMouseOverHeader', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOverHeader ).toBeUndefined();
            } );

            test( 'should be passed to the <header> as onMouseOver', () =>
            {
                const onMouseOverHeader = jest.fn();
                wrapper.setProps( { onMouseOverHeader, title: 'hello' } );

                expect( wrapper.find( 'header' ).prop( 'onMouseOver' ) )
                    .toBe( onMouseOverHeader );
            } );
        } );
    } );
} );


describe( 'ModuleDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Module /> );
        driver  = wrapper.driver();
    } );

    describe( 'toggle()', () =>
    {
        test( 'should fire the onClickToggle prop once', () =>
        {
            const toggleSpy = jest.fn();
            wrapper.setProps( {
                title         : 'Boom',
                isCollapsible : true,
                onClickToggle : toggleSpy,
            } );

            driver.toggle();

            expect( toggleSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickDelete()', () =>
    {
        test( 'should fire the onClickDelete prop once', () =>
        {
            const clickDeleteSpy = jest.fn();
            wrapper.setProps( {
                title         : 'Boom',
                isDeletable   : true,
                onClickDelete : clickDeleteSpy,
            } );

            driver.clickDelete();

            expect( clickDeleteSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getCustomHeader()', () =>
    {
        test( 'should return the customHeader content', () =>
        {
            wrapper.setProps( {
                title        : 'Boom',
                customHeader : <h1 className = "pokemon">Pikachu</h1>,
            } );

            const header = driver.getCustomHeader();
            expect( header.find( '.pokemon' ) ).toHaveLength( 1 );
        } );
    } );
} );
