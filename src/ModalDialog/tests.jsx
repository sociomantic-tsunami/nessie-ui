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

    test( 'should render <ModalDialog/>', () =>
    {
        Wrapper = mount( <ModalDialog /> );

        expect( Wrapper.find( ModalDialog ) ).toBeTruthy;
    } );

    test( 'should not contain child elements when not visible', () =>
    {
        const props = {
            isVisible : false,
            children  : <span className = "thisguy">boom</span>
        };
        Wrapper = mount( <ModalDialog { ...props } /> );

        const children = Wrapper.driver().getContent();
        expect( children ).toBeUndefined;
    } );

    test( 'should contain child elements when visible', () =>
    {
        const props = {
            isVisible : true,
            children  : <span className = "thisguy">boom</span>
        };
        Wrapper = mount( <ModalDialog { ...props } /> );

        const children = Wrapper.driver().getContent();
        expect( children ).toBeTruthy;
        expect( children.html() ).toBe( '<span class="thisguy">boom</span>' );
    } );

    test( 'should trigger `onClickOverlay` callback when overlay clicked', () =>
    {
        const callBack = jest.fn();

        const props = {
            isVisible      : true,
            onClickOverlay : callBack
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickOverlay();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should trigger `onClickOverlay` when close button is clicked', () =>
    {
        const callBack = jest.fn();

        const props = {
            isVisible      : true,
            onClickOverlay : callBack,
            type           : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickClose();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should trigger `onClickPrev` when prev button is clicked', () =>
    {
        const callBack = jest.fn();

        const props = {
            isVisible   : true,
            onClickPrev : callBack,
            type        : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickPrev();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should trigger `onClickNext` when next button is clicked', () =>
    {
        const callBack = jest.fn();

        const props = {
            isVisible   : true,
            onClickNext : callBack,
            type        : 'carousel'
        };
        Wrapper = mount( <ModalDialog { ...props } /> );
        Wrapper.driver().clickNext();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    describe( 'driver', () =>
    {
        test( 'should throw an error when clicking the close button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = jest.fn();

            const props = {
                isVisible      : true,
                onClickOverlay : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickClose() ).toThrowError( "Cannot trigger click on the \"Close Button\" because the modal is not a Carousel" );
            expect( callBack ).toHaveBeenCalledTimes( 0 );
        } );

        test( 'should throw an error when clicking the prev button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = jest.fn();

            const props = {
                isVisible   : true,
                onClickPrev : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickPrev() ).toThrowError( "Cannot trigger click on the \"Prev Button\" because the modal is not a Carousel" );
            expect( callBack ).toHaveBeenCalledTimes( 0 );
        } );

        test( 'should throw an error when clicking the next button on a modal \
                that\'s not a carousel', () =>
        {
            const callBack = jest.fn();

            const props = {
                isVisible   : true,
                onClickNext : callBack
            };

            Wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => Wrapper.driver().clickNext() ).toThrowError( "Cannot trigger click on the \"Next Button\" because the modal is not a Carousel" );
            expect( callBack.calledOnce ).toBeFalsy;
        } );
    } );
} );
