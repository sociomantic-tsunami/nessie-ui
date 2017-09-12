/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/


import React       from 'react';
import { mount }   from 'enzyme';

import ModalDialog from './index';

describe( 'ModalDialog', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = null;
    } );

    it( 'should render <ModalDialog/>', () =>
    {
        Wrapper = mount( <ModalDialog /> );

        expect( Wrapper.find( ModalDialog ) ).to.have.length( 1 );
    } );

    it( 'should not contain child elements when not visible', () =>
    {
        const props = {
            isVisible : false,
            children  : [ <span className = "thisguy">boom</span> ]
        };
        Wrapper = mount( <ModalDialog { ...props } /> );

        const children = Wrapper.driver().getContent();
        expect( children ).to.have.length( 0 );
    } );

    it( 'should contain child elements when visible', () =>
    {
        const props = {
            isVisible : true,
            children  : [ <span className = "thisguy">boom</span> ]
        };
        Wrapper = mount( <ModalDialog { ...props } /> );

        const children = Wrapper.driver().getContent();
        expect( children ).to.have.length( 1 );
        expect( children.html() )
            .to.be.equal( '<span class="thisguy">boom</span>' );
    } );

    it( 'should trigger `onClickOverlay` callback when overlay clicked', () =>
    {
        const callBack = sinon.spy();

        const props = {
            isVisible      : true,
            onClickOverlay : callBack
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickOverlay();
        expect( callBack.calledOnce ).to.equal( true );
    } );

    it( 'should trigger `onClickOverlay` when close button is clicked', () =>
    {
        const callBack = sinon.spy();

        const props = {
            isVisible      : true,
            onClickOverlay : callBack,
            type           : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickClose();
        expect( callBack.calledOnce ).to.equal( true );
    } );

    it( 'should trigger `onClickPrev` when prev button is clicked', () =>
    {
        const callBack = sinon.spy();

        const props = {
            isVisible   : true,
            onClickPrev : callBack,
            type        : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickPrev();
        expect( callBack.calledOnce ).to.equal( true );
    } );

    it( 'should trigger `onClickNext` when next button is clicked', () =>
    {
        const callBack = sinon.spy();

        const props = {
            isVisible   : true,
            onClickNext : callBack,
            type        : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickNext();
        expect( callBack.calledOnce ).to.equal( true );
    } );

    describe( 'driver', () =>
    {
        it( 'should throw an error when clicking the close button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = sinon.spy();

            const props = {
                isVisible      : true,
                onClickOverlay : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickClose() ).to
                .throw( 'Cannot trigger click on the "Close Button" because \
the modal is not a Carousel' );
            expect( callBack.calledOnce ).to.equal( false );
        } );

        it( 'should throw an error when clicking the prev button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = sinon.spy();

            const props = {
                isVisible   : true,
                onClickPrev : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickPrev() ).to
                .throw( 'Cannot trigger click on the "Prev Button" because the \
modal is not a Carousel' );
            expect( callBack.calledOnce ).to.equal( false );
        } );

        it( 'should throw an error when clicking the next button on a modal \
                that\'s not a carousel', () =>
        {
            const callBack = sinon.spy();

            const props = {
                isVisible   : true,
                onClickNext : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickNext() )
                .to.throw( 'Cannot trigger click on the "Next Button" because \
the modal is not a Carousel' );
            expect( callBack.calledOnce ).to.equal( false );
        } );
    } );
} );
