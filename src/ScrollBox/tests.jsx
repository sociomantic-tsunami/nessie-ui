/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import ScrollBox    from './index';

describe( 'ScrollBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = null;
    } );

    it( 'should contain a single ScrollBox', () =>
    {
        const props = {
            title : 'Boom'
        };
        wrapper = mount( <ScrollBox { ...props } /> );

        expect( wrapper.find( ScrollBox ) ).to.have.length( 1 );
        expect( wrapper.find( ScrollBox ) ).to.not.have.length( 2 );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        const props = {
            title : 'Boom'
        };

        wrapper = mount( <ScrollBox { ...props } /> );
        expect( wrapper.find( '.scrollBox__default' ) ).to.have.length( 1 );
    } );

    it( 'should have content when children props is defined', () =>
    {
        const props = {
            children : 'testing'
        };

        wrapper = mount( <ScrollBox { ...props } /> );
        expect( wrapper.find( '.scrollBox__content' ) ).to.have.length( 1 );
    } );
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    describe( 'onClickScroll', () =>
    {
        it( 'should trigger onClickScrollUp when clicked on scrollUp',
            () =>
            {
                const onClickScrollUp = sinon.spy();
                const props = {
                    scrollUpIsVisible : true,
                    onClickScrollUp
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollUp();
                console.log( wrapper.debug() );

                expect( onClickScrollUp.calledOnce ).to.be.true;
            } );


        it( 'should trigger onClickScrollRight when clicked on scrollRight',
            () =>
            {
                const onClickScrollRight = sinon.spy();
                const props = {
                    scrollRightIsVisible : true,
                    onClickScrollRight
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollRight();

                expect( onClickScrollRight.calledOnce ).to.be.true;
            } );


        it( 'should trigger onClickScrollDown when clicked on scrollDown', () =>
        {
            const onClickScrollDown = sinon.spy();
            const props = {
                scrollDownIsVisible : true,
                onClickScrollDown
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollDown();

            expect( onClickScrollDown.calledOnce ).to.be.true;
        } );


        it( 'should trigger onClickScrollLeft when clicked on scrollLeft', () =>
        {
            const onClickScrollLeft = sinon.spy();
            const props = {
                scrollLeftIsVisible : true,
                onClickScrollLeft
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollLeft();

            expect( onClickScrollLeft.calledOnce ).to.be.true;
        } );
    } );


    describe( 'scroll', () =>
    {
        describe( 'scrollVertical()', () =>
        {
            it( 'should trigger onScroll() for vertical scroll', () =>
            {
                const onScroll = sinon.spy();
                const props = {
                    scroll : 'vertical',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollVertical( 0.25 );

                expect( onScroll.calledOnce ).to.be.true;
            } );

            it( 'should call onScroll with scrollOffset', () =>
            {
                const onScroll = sinon.spy();
                const props = {
                    scroll : 'vertical',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollVertical( 0.72 );

                expect( onScroll.lastCall.args[ 0 ].target.scrollTop )
                    .to.equal( 0.72 );
            } );
        } );

        describe( 'scrollHorizontal()', () =>
        {
            it( 'should trigger onScroll() for horizontal scroll', () =>
            {
                const onScroll = sinon.spy();
                const props = {
                    scroll : 'horizontal',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollHorizontal( 0.64 );

                expect( onScroll.calledOnce ).to.be.true;
            } );

            it( 'should call onScroll with scrollOffset', () =>
            {
                const onScroll = sinon.spy();
                const props = {
                    scroll : 'horizontal',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollHorizontal( 0.48 );

                expect( onScroll.lastCall.args[ 0 ].target.scrollLeft )
                    .to.equal( 0.48 );
            } );
        } );
    } );
} );
