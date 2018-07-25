/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React                      from 'react';
import { mount }                  from 'enzyme';

import Uploader                   from './index';

describe( 'Uploader', () =>
{
    let wrapper;

    describe( 'default state', () =>
    {
        beforeEach( () =>
        {
            wrapper = mount( <Uploader /> );
        } );

        test( 'should render component based on Button iconType=upload', () =>
        {
            expect( wrapper.find( 'Button', 'Uploader', 'Icon' ) )
                .toHaveLength( 1 );
        } );
    } );

    describe( 'uploading state', () =>
    {
        beforeEach( () =>
        {
            wrapper = mount( <Uploader uploadState = "uploading" /> );
        } );

        test(
            'should render component based on Button which isLoading=true',
            () =>
            {
                expect( wrapper.find( 'Button', 'Upload', 'Spinner' ) )
                    .toHaveLength( 1 );
            },
        );
    } );

    describe( 'uploaded state', () =>
    {
        beforeEach( () =>
        {
            wrapper = mount( <Uploader uploadState = "uploaded" /> );
        } );

        test( 'should render a component based on Button without Icon', () =>
        {
            expect( wrapper.find( 'Button', 'Upload', 'Icon' ) )
                .toHaveLength( 1 );
        } );

        test(
            'should render a component based on IconButton iconType=close',
            () =>
            {
                expect( wrapper.find( 'IconButton', 'Upload', 'Icon' ) )
                    .toHaveLength( 1 );
            },
        );

        describe( 'readOnly state', () =>
        {
            beforeEach( () =>
            {
                wrapper = mount( <Uploader
                    uploadState = "uploaded"
                    isReadOnly /> );
            } );

            test( 'should render a component with on Button with a readonly \
state', () =>
            {
                expect( wrapper.find( 'IconButton', 'Upload', 'Icon' ) )
                    .toHaveLength( 1 );
                expect( wrapper.find( 'IconButton', 'Upload', 'Icon' )
                    .prop( 'isReadOnly' ) ).toBeTruthy();
            } );
        } );
    } );

    describe( 'readOnly state', () =>
    {
        beforeEach( () =>
        {
            wrapper = mount( <Uploader isReadOnly /> );
        } );

        test(
            'should render a component based on Button with a readonly state',
            () =>
            {
                expect( wrapper.find( 'Button' ) ).toHaveLength( 1 );
                expect( wrapper.find( 'Button' ).prop( 'isReadOnly' ) )
                    .toBeTruthy();
            },
        );
    } );
} );

describe( 'UploaderDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Uploader /> );
        driver  = wrapper.driver();
    } );

    describe( 'onClick', () =>
    {
        test( 'should trigger onClick event', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
                uploadState : 'default',
            } );

            driver.click();
            expect( onClick ).toBeCalled();
        } );

        test( 'should trigger onClick event when clicked on secondary', () =>
        {
            const onClickSecondary = jest.fn();
            wrapper.setProps( {
                onClickSecondary,
                uploadState : 'uploaded',
            } );

            driver.clickSecondary();
            expect( onClickSecondary ).toBeCalled();
        } );
    } );

    describe( 'onChange', () =>
    {
        test( 'should be undefined by default', () =>
        {
            wrapper = mount( <Uploader /> );
            expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should trigger onMouseOut() callback function', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut,
            } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalled();
        } );
    } );
    describe( 'mouseOver', () =>
    {
        test( 'should trigger onMouseOver() callback function', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver,
            } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalled();
        } );
    } );
} );
