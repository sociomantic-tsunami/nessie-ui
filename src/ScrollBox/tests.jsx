/* global test jest */
/* eslint no-console: 0*/


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
        instance.scrollBoxRef = {
            style : {
                setProperty : jest.fn()
            }
        };
    } );

    test( 'should have exactly one ScrollBar when scroll is "horizontal"', () =>
    {
        wrapper.setState( {
            thumbSize : {
                horizontal : 1,
                vertical   : 0
            }
        } );
        wrapper.setProps( { scroll: 'horizontal' } );
        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly one ScrollBar when scroll is "vertical"', () =>
    {
        wrapper.setState( {
            thumbSize : {
                horizontal : 0,
                vertical   : 1
            }
        } );
        wrapper.setProps( { scroll: 'vertical' } );
        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly two ScrollBars when scroll is "both"', () =>
    {
        wrapper.setState( {
            thumbSize : {
                horizontal : 1,
                vertical   : 1
            }
        } );
        wrapper.setProps( { scroll: 'both' } );
        expect( wrapper.find( ScrollBar ) ).toHaveLength( 2 );
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

    describe( 'scroll', () =>
    {
        test( 'should be "both" by default', () =>
        {
            expect( instance.props.scroll ).toBe( 'both' );
        } );

        test( 'should be passed to both ScrollBars as orientation prop', () =>
        {
            wrapper.setState( {
                thumbSize : {
                    horizontal : 1,
                    vertical   : 1
                }
            } );
            wrapper.setProps( { scroll: 'horizontal' } );
            expect( wrapper.find( ScrollBar ).first().prop( 'orientation' ) ).toBe( 'horizontal' );
            wrapper.setProps( { scroll: 'vertical' } );
            expect( wrapper.find( ScrollBar ).first().prop( 'orientation' ) ).toBe( 'vertical' );
        } );
    } );

    describe( 'thumbSize', () =>
    {
        test( 'should be passed to the ScrollBar as thumbSize prop', () =>
        {
            wrapper.setState( {
                thumbSize : {
                    horizontal : 50,
                    vertical   : 100,
                }
            } );

            expect( wrapper.find( ScrollBar ).first().prop( 'thumbSize' ) ).toBe( 50 );
            expect( wrapper.find( ScrollBar ).last().prop( 'thumbSize' ) ).toBe( 100 );
        } );
    } );
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    describe( 'clickScroll', () =>
    {
        test(
            'should trigger onClickScrollUp when clicked on scrollUp once',
            () =>
            {
                const onClickScrollUp = jest.fn();
                const props = {
                    scrollUpIsVisible : true,
                    onClickScrollUp
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollUp();

                expect( onClickScrollUp ).toBeCalledTimes( 1 );
            }
        );


        test(
            'should trigger onClickScrollRight when clicked \
on scrollRight once',
            () =>
            {
                const onClickScrollRight = jest.fn();
                const props = {
                    scrollRightIsVisible : true,
                    onClickScrollRight
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollRight();

                expect( onClickScrollRight ).toBeCalledTimes( 1 );
            }
        );


        test(
            'should trigger onClickScrollDown when clicked on scrollDown once',
            () =>
            {
                const onClickScrollDown = jest.fn();
                const props = {
                    scrollDownIsVisible : true,
                    onClickScrollDown
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollDown();

                expect( onClickScrollDown ).toBeCalledTimes( 1 );
            }
        );


        test(
            'should trigger onClickScrollLeft when clicked on scrollLeft once',
            () =>
            {
                const onClickScrollLeft = jest.fn();
                const props = {
                    scrollLeftIsVisible : true,
                    onClickScrollLeft
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().clickScrollLeft();

                expect( onClickScrollLeft ).toBeCalledTimes( 1 );
            }
        );
    } );


    describe( 'scroll', () =>
    {
        describe( 'scrollVertical()', () =>
        {
            test( 'should trigger onScroll() for vertical scroll once', () =>
            {
                const onScroll = jest.fn();
                const props = {
                    scroll : 'vertical',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollVertical( 250 );

                expect( onScroll ).toBeCalledTimes( 1 );
            } );

            test( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'horizontal'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollVertical( 10 ) ).toThrowError( 'Cannot scroll because scroll direction is neither \'vertical\' nor \'both\'' ); // eslint-disable-line max-len
            } );
        } );

        describe( 'scrollHorizontal()', () =>
        {
            test( 'should trigger onScroll() for horizontal scroll once', () =>
            {
                const onScroll = jest.fn();
                const props = {
                    scroll : 'horizontal',
                    onScroll
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                wrapper.driver().scrollHorizontal( 640 );

                expect( onScroll ).toBeCalledTimes( 1 );
            } );

            test( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'vertical'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollHorizontal( 270 ) ).toThrowError( 'Cannot scroll because scroll direction is neither \'horizontal\' nor \'both\'' ); // eslint-disable-line max-len
            } );
        } );
    } );
} );
