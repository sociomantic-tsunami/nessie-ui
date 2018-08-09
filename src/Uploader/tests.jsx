/* global test jest */
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
            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
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
            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'onChange( val )', () =>
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
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Uploader can\'t change since it is disabled';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Uploader can\'t change since it is read only';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
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
