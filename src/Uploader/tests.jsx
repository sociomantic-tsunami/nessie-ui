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
        beforeEach( () =>
        {
            Wrapper = mount( <Uploader /> );
        } );

        it( 'should render component based on Button iconType=upload', () =>
        {
            expect( Wrapper.find( 'Button', 'Uploader', 'Icon' ) )
                .to.have.length( 1 );
        } );
    } );

    describe( 'uploading state', () =>
    {
        beforeEach( () =>
        {
            Wrapper = mount( <Uploader uploadState = "uploading" /> );
        } );

        it( 'should render component based on Button which isLoading=true',
            () =>
            {
                expect( Wrapper.find( 'Button', 'Upload', 'Spinner' ) )
                    .to.have.length( 1 );
            } );
    } );

    describe( 'uploaded state', () =>
    {
        beforeEach( () =>
        {
            Wrapper = mount( <Uploader uploadState = "uploaded" /> );
        } );

        it( 'should render a component based on Button without Icon', () =>
        {
            expect( Wrapper.find( 'Button', 'Upload', 'Icon' ) )
                .to.have.length( 1 );
        } );

        it( 'should render a component based on IconButton iconType=close',
            () =>
            {
                expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' ) )
                    .to.have.length( 1 );
            } );

        describe( 'readOnly state', () =>
        {
            beforeEach( () =>
            {
                Wrapper = mount(
                    <Uploader uploadState = "uploaded" isReadOnly />
                );
            } );

            it( 'should render a component with on Button with a readonly \
state', () =>
                {
                    expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' ) )
                        .to.have.length( 1 );
                    expect( Wrapper.find( 'IconButton', 'Upload', 'Icon' )
                        .prop( 'isReadOnly' ) ).to.be.true;
                } );
        } );
    } );

    describe( 'readOnly state', () =>
    {
        beforeEach( () =>
        {
            Wrapper = mount( <Uploader isReadOnly /> );
        } );

        it( 'should render a component based on Button with a readonly state',
            () =>
            {
                expect( Wrapper.find( 'Button' ) ).to.have.length( 1 );
                expect( Wrapper.find( 'Button' ).prop( 'isReadOnly' )
                ).to.be.true;
            } );
    } );
} );

describe( 'UploaderDriver', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Uploader /> );
    } );

    describe( 'onClick', () =>
    {
        it( 'should trigger onClick event', () =>
        {
            const onClick = sinon.spy();
            Wrapper.setProps( {
                onClick,
                uploadState : 'default'
            } );

            Wrapper.driver().click();
            expect( onClick.calledOnce ).to.be.true;
        } );

        it( 'should trigger onClick event when clicked on secondary', () =>
        {
            const onClickSecondary = sinon.spy();
            Wrapper.setProps( {
                onClickSecondary,
                uploadState : 'uploaded'
            } );

            Wrapper.driver().clickSecondary();
            expect( onClickSecondary.calledOnce ).to.be.true;
        } );
    } );

    describe( 'onChange', () =>
    {
        it( 'should be undefined by default', () =>
        {
            Wrapper = mount( <Uploader /> );
            expect( Wrapper.prop( 'onChange' ) ).to.be.undefined;
        } );
    } );

    describe( 'mouseOut', () =>
    {
        it( 'should trigger onMouseOut() callback function', () =>
        {
            const onMouseOut = sinon.spy();
            Wrapper.setProps( {
                onMouseOut
            } );

            Wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );
    describe( 'mouseOver', () =>
    {
        it( 'should trigger onMouseOver() callback function', () =>
        {
            const onMouseOver = sinon.spy();
            Wrapper.setProps( {
                onMouseOver
            } );

            Wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );
} );
