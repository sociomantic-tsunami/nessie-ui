/* eslint-disable no-magic-numbers, no-multi-str */

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

        test( 'it should render an <input type="file">', () =>
        {
            expect( wrapper.find( 'input' ).prop( 'type' ) ).toBe( 'file' );
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

    describe( 'onClick()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
                uploadState : 'default',
            } );

            driver.click();
            expect( onClick ).toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isDisabled: true } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should not trigger onClick when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isReadOnly: true } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'onClickSecondary()', () =>
    {
        test( 'should trigger onClickSecondary callback prop once', () =>
        {
            const onClickSecondary = jest.fn();
            wrapper.setProps( {
                onClickSecondary,
                uploadState : 'uploaded',
            } );

            driver.clickSecondary();
            expect( onClickSecondary ).toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should not trigger onClickSecondary when isDisabled', () =>
            {
                const onClickSecondary = jest.fn();
                wrapper.setProps( { onClickSecondary, isDisabled: true } );

                try
                {
                    driver.clickSecondary();
                }
                catch ( error )
                {
                    expect( onClickSecondary ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should not trigger onClickSecondary when isReadOnly', () =>
            {
                const onClickSecondary = jest.fn();
                wrapper.setProps( { onClickSecondary, isReadOnly: true } );

                try
                {
                    driver.clickSecondary();
                }
                catch ( error )
                {
                    expect( onClickSecondary ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'change( val )', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
        } );

        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change( 'jkl' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Uploader cannot simulate change since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isDisabled: true } );

                try
                {
                    driver.change( 't' );
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Uploader cannot simulate change since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isReadOnly: true } );

                try
                {
                    driver.change( 't' );
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOut', () =>
    {
        test( 'should trigger onMouseOut() callback function once', () =>
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
        test( 'should trigger onMouseOver() callback function once', () =>
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
