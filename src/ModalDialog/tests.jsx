/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React               from 'react';
import { mount, shallow }  from 'enzyme';

import { ModalDialog }     from '../index';


describe( 'ModalDialog', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <ModalDialog /> );
    } );

    test( 'should not contain child elements when not visible', () =>
    {
        wrapper.setProps( {
            isVisible : false,
            children  : <span className = "thisguy">boom</span>,
        } );

        const children = wrapper.find( '.content' ).children();
        expect( children ).toHaveLength( 0 );
    } );

    test( 'should contain child elements when visible', () =>
    {
        wrapper.setProps( {
            isVisible : true,
            children  : <span className = "thisguy">boom</span>,
        } );

        const children = wrapper.find( '.content' ).children();
        expect( children.html() ).toBe( '<span class="thisguy">boom</span>' );
    } );
} );


describe( 'ModalDialogDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ModalDialog /> );
    } );


    test(
        'should trigger `onClickOverlay` once callback when overlay clicked',
        () =>
        {
            const onClickOverlay = jest.fn();
            wrapper.setProps( { isVisible: true, onClickOverlay } );

            wrapper.driver().clickOverlay();
            expect( onClickOverlay ).toHaveBeenCalledTimes( 1 );
        },
    );

    test(
        'should trigger `onClickClose` once when close button is clicked',
        () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                isVisible : true,
                onClickClose,
                type      : 'carousel',
            } );

            wrapper.driver().clickClose();
            expect( onClickClose ).toHaveBeenCalledTimes( 1 );
        },
    );

    test( 'should trigger `onClickPrev` once when prev button is clicked', () =>
    {
        const onClickPrev = jest.fn();
        wrapper.setProps( {
            isVisible : true,
            onClickPrev,
            type      : 'carousel',
        } );

        wrapper.driver().clickPrev();
        expect( onClickPrev ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should trigger `onClickNext` once when next button is clicked', () =>
    {
        const onClickNext = jest.fn();
        wrapper.setProps( {
            isVisible : true,
            onClickNext,
            type      : 'carousel',
        } );

        wrapper.driver().clickNext();
        expect( onClickNext ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should throw an error when clicking the close button on a modal \
that’s not a carousel', () =>
    {
        const onClickOverlay = jest.fn();
        wrapper.setProps( {
            isVisible : true,
            onClickOverlay,
        } );

        expect( () => wrapper.driver().clickClose() )
            .toThrowError( 'Cannot trigger click on the "Close Button" because \
the modal is not a Carousel' );
        expect( onClickOverlay ).not.toBeCalled();
    } );

    test( 'should throw an error when clicking the prev button on a modal \
that’s not a carousel', () =>
    {
        const onClickPrev = jest.fn();
        wrapper.setProps( {
            isVisible : true,
            onClickPrev,
        } );

        expect( () => wrapper.driver().clickPrev() )
            .toThrowError( 'Cannot trigger click on the "Prev Button" because \
the modal is not a Carousel' );
        expect( onClickPrev ).not.toBeCalled();
    } );

    test( 'should throw an error when clicking the next button on a modal \
that’s not a carousel', () =>
    {
        const onClickNext = jest.fn();
        wrapper.setProps( {
            isVisible : true,
            onClickNext,
        } );

        expect( () => wrapper.driver().clickNext() )
            .toThrowError( 'Cannot trigger click on the "Next Button" because \
the modal is not a Carousel' );
        expect( onClickNext ).not.toBeCalled();
    } );
} );
