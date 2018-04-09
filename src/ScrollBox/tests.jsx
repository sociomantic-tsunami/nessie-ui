/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import ScrollBox    from './index';

describe.only( 'ScrollBox', () =>
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


    describe( 'contentWidth', () =>
    {
        it( 'should get contentWidth', () =>
        {
            const props = {
                contentWidth : '125%'
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            expect( wrapper.driver().getContentWidth() ).to.equal( '125%' );
        } );

        it( 'should set contentWidth', () =>
        {
            wrapper = mount( <ScrollBox /> );
            wrapper.driver().setContentWidth( '150%' );

            expect( wrapper.driver().getContentWidth() ).to.equal( '150%' );
        } );
    } );


    describe( 'height', () =>
    {
        it( 'should get height', () =>
        {
            const props = {
                height : '75px'
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            expect( wrapper.driver().getHeight() ).to.equal( '75px' );
        } );

        it( 'should set height', () =>
        {
            wrapper = mount( <ScrollBox /> );
            wrapper.driver().setHeight( '50vh' );

            expect( wrapper.driver().getHeight() ).to.equal( '50vh' );
        } );
    } );
} );
