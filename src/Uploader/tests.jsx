/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React                      from 'react';
import { mount }                  from 'enzyme';

import Uploader                   from './index';

describe( 'Uploader', () =>
{
    let Wrapper;

    describe( 'default state', () =>
    {
        beforeEach(() =>
        {
            Wrapper = mount( <Uploader /> );
        });

        test('should render component based on Button iconType=upload', () =>
        {
            expect( Wrapper.find( 'Button', 'Uploader', 'Icon' ) ).toHaveLength(1);
        });
    } );

    describe( 'uploading state', () =>
    {
        beforeEach(() =>
        {
            Wrapper = mount( <Uploader uploadState = "uploading" /> );
        });

        test('should render component based on Button which isLoading=true', () =>
        {
            expect( Wrapper.find( 'Button', 'Upload', 'Spinner' ) ).toHaveLength(1);
        });
    } );

    describe( 'uploaded state', () =>
    {
        beforeEach(() =>
        {
            Wrapper = mount( <Uploader uploadState = "uploaded" /> );
        });

        test('should render a component based on Button without Icon', () =>
        {
            expect( Wrapper.find( 'Button', 'Upload', 'Icon' ) ).toHaveLength(1);
        });

        test('should render a component based on IconButton iconType=close', () =>
        {
            expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' ) ).toHaveLength(1);
        });

        describe( 'readOnly state', () =>
        {
            beforeEach(() =>
            {
                Wrapper = mount(
                    <Uploader uploadState = "uploaded" isReadOnly />
                );
            });

            test('should render a component with on Button with a readonly \
state', () =>
                {
                    expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' ) ).toHaveLength(1);
                    expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' )
                        .prop( 'isReadOnly' ) ).toBe(true);
                });
        } );
    } );

    describe( 'readOnly state', () =>
    {
        beforeEach(() =>
        {
            Wrapper = mount( <Uploader isReadOnly /> );
        });

        test('should render a component based on Button with a readonly state', () =>
        {
            expect( Wrapper.find( 'Button' ) ).toHaveLength(1);
            expect( Wrapper.find( 'Button' ).prop( 'isReadOnly' )
            ).toBe(true);
        });
    } );
} );

describe( 'UploaderDriver', () =>
{
    let Wrapper;

    beforeEach(() =>
    {
        Wrapper = mount( <Uploader /> );
    });

    describe( 'onClick', () =>
    {
        test('should trigger onClick event', () =>
        {
            const onClick = jest.fn();
            Wrapper.setProps( {
                onClick,
                uploadState : 'default'
            } );

            Wrapper.driver().click();
            expect( onClick.calledOnce ).toBe(true);
        });

        test('should trigger onClick event when clicked on secondary', () =>
        {
            const onClickSecondary = jest.fn();
            Wrapper.setProps( {
                onClickSecondary,
                uploadState : 'uploaded'
            } );

            Wrapper.driver().clickSecondary();
            expect( onClickSecondary.calledOnce ).toBe(true);
        });
    } );

    describe( 'onChange', () =>
    {
        test('should be undefined by default', () =>
        {
            Wrapper = mount( <Uploader /> );
            expect( Wrapper.prop( 'onChange' ) ).toBeUndefined();
        });
    } );

    describe( 'mouseOut', () =>
    {
        test('should trigger onMouseOut() callback function', () =>
        {
            const onMouseOut = jest.fn();
            Wrapper.setProps( {
                onMouseOut
            } );

            Wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );
    describe( 'mouseOver', () =>
    {
        test('should trigger onMouseOver() callback function', () =>
        {
            const onMouseOver = jest.fn();
            Wrapper.setProps( {
                onMouseOver
            } );

            Wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );
} );
