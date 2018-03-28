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
            driver.setShownPages( [ 10, 11, 12 ] );

            expect( driver.getShownPages() ).to.eql( [ 10, 11, 12 ] );
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
} );
