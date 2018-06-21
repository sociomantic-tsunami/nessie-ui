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

    test( 'should contain a single ScrollBox', () =>
    {
        const props = {
            title : 'Boom'
        };
        wrapper = mount( <ScrollBox { ...props } /> );

        expect( wrapper.find( ScrollBox ) ).toHaveLength( 1 );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        const props = {
            title : 'Boom'
        };

        wrapper = mount( <ScrollBox { ...props } /> );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have content when children props is defined', () =>
    {
        const props = {
            children : 'testing'
        };

        wrapper = mount( <ScrollBox { ...props } /> );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).content}` ) )
            .toHaveLength( 1 );
    } );
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    describe( 'clickScroll', () =>
    {
        test( 'should trigger onClickScrollUp when clicked on scrollUp', () =>
        {
            const onClickScrollUp = jest.fn();
            const props = {
                scrollUpIsVisible : true,
                onClickScrollUp
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollUp();

            expect( onClickScrollUp.calledOnce ).toBeTruthy;
        } );


        test( 'should trigger onClickScrollRight when clicked on scrollRight', () =>
        {
            const onClickScrollRight = jest.fn();
            const props = {
                scrollRightIsVisible : true,
                onClickScrollRight
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollRight();

            expect( onClickScrollRight.calledOnce ).toBeTruthy;
        } );


        test( 'should trigger onClickScrollDown when clicked on scrollDown', () =>
        {
            const onClickScrollDown = jest.fn();
            const props = {
                scrollDownIsVisible : true,
                onClickScrollDown
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollDown();

            expect( onClickScrollDown.calledOnce ).toBeTruthy;
        } );


        test( 'should trigger onClickScrollLeft when clicked on scrollLeft', () =>
        {
            const onClickScrollLeft = jest.fn();
            const props = {
                scrollLeftIsVisible : true,
                onClickScrollLeft
            };

            wrapper = mount( <ScrollBox { ...props } /> );

            wrapper.driver().clickScrollLeft();

            expect( onClickScrollLeft.calledOnce ).toBeTruthy;
        } );
    } );


    describe( 'scroll', () =>
    {
        describe( 'scrollVertical()', () =>
        {
            test( 'should trigger onScroll() for vertical scroll', () =>
            {
                const onScroll = jest.fn();
                const props = {
                    scroll : 'vertical',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollVertical( 250 );

                expect( onScroll.calledOnce ).toBeTruthy;
            } );

            test( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'horizontal'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollVertical( 10 ) ).toThrowError( "Cannot scroll because scroll direction is neither 'vertical' nor 'both'" ); // eslint-disable-line max-len
            } );
        } );

        describe( 'scrollHorizontal()', () =>
        {
            test( 'should trigger onScroll() for horizontal scroll', () =>
            {
                const onScroll = jest.fn();
                const props = {
                    scroll : 'horizontal',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollHorizontal( 640 );

                expect( onScroll.calledOnce ).toBeTruthy;
            } );

            test( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'vertical'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollHorizontal( 270 ) ).toThrowError( "Cannot scroll because scroll direction is neither 'horizontal' nor 'both'" ); // eslint-disable-line max-len
            } );
        } );
    } );
} );
