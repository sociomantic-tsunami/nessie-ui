
/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
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

    describe( 'clickToggle()', () =>
    {
        test( 'should fire the onClickToggle prop once', () =>
        {
            const onClickToggle = jest.fn();
            wrapper.setProps( {
                title         : 'Boom',
                isCollapsible : true,
                onClickToggle,
            } );

            driver.clickToggle();
            expect( onClickToggle ).toBeCalledTimes( 1 );
        } );

        test( 'should throw expected error if isCollapsible: false', () =>
        {
            const error = 'Module is not collapsible. Cannot simulate toggle.';
            wrapper.setProps( { title: 'Boom' } );

            expect( () => driver.clickToggle() ).toThrowError( error );
        } );
    } );


    describe( 'clickDelete()', () =>
    {
        test( 'should fire the onClickDelete prop once', () =>
        {
            const onClickDelete = jest.fn();
            wrapper.setProps( {
                title       : 'Boom',
                isDeletable : true,
                onClickDelete,
            } );

            driver.clickDelete();
            expect( onClickDelete ).toBeCalledTimes( 1 );
        } );

        test( 'should throw expected error if isDeletable: false', () =>
        {
            const error =
                'Module has no delete button. Cannot simulate delete.';
            wrapper.setProps( { title: 'Boom' } );

            expect( () => driver.clickDelete() ).toThrowError( error );
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

            const header = wrapper.find( `.${wrapper.props().cssMap.header}` )
                .children();
            expect( header.find( '.pokemon' ) ).toHaveLength( 1 );
        } );
    } );


    describe( 'mouseOverHeader()', () =>
    {
        test( 'should trigger onMouseOverHeader callback once', () =>
        {
            const onMouseOverHeader = jest.fn();
            wrapper.setProps( { onMouseOverHeader, title: 'Cthulhu' } );

            driver.mouseOverHeader();
            expect( onMouseOverHeader ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOutHeader()', () =>
    {
        test( 'should trigger onMouseOutHeader callback once', () =>
        {
            const onMouseOutHeader = jest.fn();
            wrapper.setProps( { onMouseOutHeader, title: 'Cthulhu' } );

            driver.mouseOutHeader();
            expect( onMouseOutHeader ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOverError()', () =>
    {
        test( 'should trigger onMouseOverError callback once', () =>
        {
            const onMouseOverError = jest.fn();
            wrapper.setProps( {
                onMouseOverError,
                hasError     : true,
                errorMessage : 'hoomans',
                title        : 'Azathoth',
            } );

            driver.mouseOverError();
            expect( onMouseOverError ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOutError()', () =>
    {
        test( 'should trigger onMouseOutError callback once', () =>
        {
            const onMouseOutError = jest.fn();
            wrapper.setProps( {
                onMouseOutError,
                hasError     : true,
                errorMessage : 'hoomans',
                title        : 'Azathoth',
            } );

            driver.mouseOutError();
            expect( onMouseOutError ).toBeCalledTimes( 1 );
        } );
    } );
} );
