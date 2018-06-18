import React                    from 'react';
import { mount }                from 'enzyme';

import { Paginator }            from '../index';

describe( 'PaginatorDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper  = mount( <Paginator /> );
        driver   = wrapper.driver();
    });

    describe( 'clickPrev()', () =>
    {
        let onClickPrev;

        test('should fire onClickPrev exactly once', () =>
        {
            onClickPrev = sinon.spy();
            wrapper.setProps( {
                onClickPrev,
                showPrev : true,
            } );

            driver.clickPrev();

            expect( onClickPrev.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickNext()', () =>
    {
        let onClickNext;

        test('should fire onClickNext exactly once', () =>
        {
            onClickNext = sinon.spy();
            wrapper.setProps( {
                onClickNext,
                showNext : true,
            } );

            driver.clickNext();

            expect( onClickNext.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickPage()', () =>
    {
        let onClickPage;

        test('should fire onClickPage exactly once', () =>
        {
            onClickPage = sinon.spy();
            wrapper.setProps( {
                onClickPage,
                shownPages : [ 10, 11, 12 ],
            } );

            driver.clickPage( 1 );

            expect( onClickPage.calledOnce ).toBe(true);
        });
    } );
} );
