import React                 from 'react';
import { mount, shallow }    from 'enzyme';

import ScrollBar             from '../ScrollBar';

import ScrollBox             from './index';

describe( 'ScrollBox', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBox /> );
        instance = wrapper.instance();
        instance.innerRef = {
            clientHeight : 100,
            scrollHeight : 200,
            clientWidth  : 100,
            scrollWidth  : 200,
        };
        wrapper.setState();
    } );

    test( 'should have exactly one ScrollBar when scroll is "horizontal"', () =>
    {
        wrapper.setProps( { scroll: 'horizontal' } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly one ScrollBar when scroll is "vertical"', () =>
    {
        wrapper.setProps( { scroll: 'vertical' } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly two ScrollBars when scroll is "both"', () =>
    {
        wrapper.setProps( { scroll: 'both' } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 2 );
    } );

    test( 'thumbSize should be set on the scrollBars', () =>
    {
        wrapper.setProps( { scroll: 'both' } );

        expect( wrapper.find( ScrollBar ).first().prop( 'thumbSize' ) )
            .toBe( '50%' );

        expect( wrapper.find( ScrollBar ).last().prop( 'thumbSize' ) )
            .toBe( '50%' );
    } );
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBox /> );
    } );

    describe( 'clickScrollX', () =>
    {
        test( 'invokes onClickScrollUp callback prop', () =>
        {
            const onClickScrollUp = jest.fn();
            wrapper.setProps( { onClickScrollUp, scrollUpIsVisible: true } );

            wrapper.driver().clickScrollUp();

            expect( onClickScrollUp ).toBeCalledTimes( 1 );
        } );

        test( 'invokes onClickScrollRight callback prop', () =>
        {
            const onClickScrollRight = jest.fn();
            wrapper.setProps( {
                onClickScrollRight,
                scrollRightIsVisible : true,
            } );

            wrapper.driver().clickScrollRight();

            expect( onClickScrollRight ).toBeCalledTimes( 1 );
        } );


        test( 'invokes onClickScrollDown callback prop', () =>
        {
            const onClickScrollDown = jest.fn();
            wrapper.setProps( {
                onClickScrollDown,
                scrollDownIsVisible : true,
            } );

            wrapper.driver().clickScrollDown();

            expect( onClickScrollDown ).toBeCalledTimes( 1 );
        } );


        test( 'invokes onClickScrollLeft callback prop', () =>
        {
            const onClickScrollLeft = jest.fn();
            wrapper.setProps( {
                onClickScrollLeft,
                scrollLeftIsVisible : true,
            } );

            wrapper.driver().clickScrollLeft();

            expect( onClickScrollLeft ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'scrollVertical()', () =>
    {
        test( 'should trigger onScroll()', () =>
        {
            const onScroll = jest.fn();
            wrapper.setProps( { onScroll, scroll: 'vertical' } );

            wrapper.driver().scrollVertical( 250 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );

        test( 'should throw an error when scroll direction is wrong', () =>
        {
            const props = { scroll: 'horizontal' };

            wrapper = mount( <ScrollBox { ...props } /> );

            expect( () => wrapper.driver().scrollVertical( 10 ) )
                .toThrowError( 'Cannot scroll because scroll direction is \
neither \'vertical\' nor \'both\'' );
        } );
    } );

    describe( 'scrollHorizontal()', () =>
    {
        test( 'should trigger onScroll()', () =>
        {
            const onScroll = jest.fn();
            wrapper.setProps( { onScroll, scroll: 'horizontal' } );

            wrapper.driver().scrollHorizontal( 250 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );


        test( 'should throw an error when scroll direction is wrong', () =>
        {
            wrapper.setProps( { scroll: 'vertical' } );

            expect( () => wrapper.driver().scrollHorizontal( 270 ) )
                .toThrowError( 'Cannot scroll because scroll direction is \
neither \'horizontal\' nor \'both\'' );
        } );
    } );
} );
