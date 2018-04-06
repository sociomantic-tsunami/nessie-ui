import React                    from 'react';
import { mount }                from 'enzyme';

import { Paginator }            from '../index';

describe( 'PaginatorDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Paginator /> );
        driver   = wrapper.driver();
    } );

    describe( 'getShownPages()', () =>
    {
        it( 'should get value of currently shown pages', () =>
        {
            wrapper.setProps( {
                shownPages : [ 10, 11, 12 ]
            } );

            expect( driver.getShownPages() ).to.eql( [ 10, 11, 12 ] );
        } );
    } );

    describe( 'setShownPages()', () =>
    {
        it( 'should set main input value', () =>
        {
            driver.setShownPages( [ 21, 22, 23 ] );

            expect( driver.getShownPages() ).to.eql( [ 21, 22, 23 ] );
        } );
    } );


    describe( 'getStartPage()', () =>
    {
        it( 'should get value of start page', () =>
        {
            wrapper.setProps( {
                startPages : 1
            } );

            expect( driver.getStartPage() ).to.eql( 1 );
        } );
    } );

    describe( 'setStartPage()', () =>
    {
        it( 'should set start page value', () =>
        {
            driver.setStartPage( 2 );

            expect( driver.getStartPage() ).to.eql( 2 );
        } );
    } );


    describe( 'getEndPage()', () =>
    {
        it( 'should get value of end page', () =>
        {
            wrapper.setProps( {
                endPages : 42
            } );

            expect( driver.getEndPage() ).to.eql( 42 );
        } );
    } );

    describe( 'setEndPage()', () =>
    {
        it( 'should set end page value', () =>
        {
            driver.setEndPages( 86 );

            expect( driver.getEndPage() ).to.eql( 86 );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        let onClickPrev;

        it( 'should fire onClickPrev exactly once', () =>
        {
            onClickPrev = sinon.spy();
            wrapper.setProps( {
                onClickPrev,
                showPrev : true,
            } );

            driver.clickPrev();

            expect( onClickPrev.calledOnce ).to.be.true;
        } );
    } );


    describe( 'clickNext()', () =>
    {
        let onClickNext;

        it( 'should fire onClickNext exactly once', () =>
        {
            onClickNext = sinon.spy();
            wrapper.setProps( {
                onClickNext,
                showNext : true,
            } );

            driver.clickNext();

            expect( onClickNext.calledOnce ).to.be.true;
        } );
    } );


    describe( 'clickPage()', () =>
    {
        let onClickPage;

        it( 'should fire onClickPage exactly once', () =>
        {
            onClickPage = sinon.spy();
            wrapper.setProps( {
                onClickPage,
                shownPages : [ 10, 11, 12 ],
            } );

            driver.clickPage( 1 );

            expect( onClickPage.calledOnce ).to.be.true;
        } );
    } );
} );
