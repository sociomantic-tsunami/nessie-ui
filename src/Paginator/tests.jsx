/* global test jest */

import React                    from 'react';
import { mount }                from 'enzyme';

import { Paginator }            from '../index';

describe( 'PaginatorDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <Paginator /> );
    } );

    describe( 'clickPrev()', () =>
    {
        let onClickPrev;

        test( 'should fire onClickPrev exactly once', () =>
        {
            onClickPrev = jest.fn();
            wrapper.setProps( {
                onClickPrev,
                showPrev : true,
            } );

            wrapper.driver().clickPrev();

            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickNext()', () =>
    {
        let onClickNext;

        test( 'should fire onClickNext exactly once', () =>
        {
            onClickNext = jest.fn();
            wrapper.setProps( {
                onClickNext,
                showNext : true,
            } );

            wrapper.driver().clickNext();

            expect( onClickNext ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickPage()', () =>
    {
        let onClickPage;

        test( 'should fire onClickPage exactly once', () =>
        {
            onClickPage = jest.fn();
            wrapper.setProps( {
                onClickPage,
                shownPages : [ 10, 11, 12 ],
            } );

            wrapper.driver().clickPage( 1 );

            expect( onClickPage ).toBeCalledTimes( 1 );
        } );
    } );
} );
