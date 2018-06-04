/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount, shallow }    from 'enzyme';

import ScrollBox    from './index';
import ScrollBar          from '../ScrollBar';

describe( 'ScrollBox', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBox /> );
        instance = wrapper.instance();
    } );

    it( 'should have exactly one ScrollBar when scroll is "horizontal"', () => {
        wrapper.setProps( { scroll: 'horizontal' } );
        expect( wrapper.find( ScrollBar ) ).to.have.length( 1 );
    } );

    it( 'should have exactly one ScrollBar when scroll is "vertical"', () => {
        wrapper.setProps( { scroll: 'vertical' } );
        expect( wrapper.find( ScrollBar ) ).to.have.length( 1 )
    } );

    it( 'should have exactly two ScrollBars when scroll is "both"', () => {
        wrapper.setProps( { scroll: 'both' } );
        expect( wrapper.find( ScrollBar ) ).to.have.length( 2 )
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        wrapper.setProps( { title: 'Boom' });
        expect( wrapper.find( '.scrollBox__default' ) ).to.have.length( 1 );
    } );

    it( 'should have content when children props is defined', () =>
    {
        wrapper.setProps( { children: 'testing' } );
        expect( wrapper.find( '.scrollBox__content' ) ).to.have.length( 1 );
    } );

    describe( 'scroll', () =>
    {
        it( 'should be "both" by default', () =>
        {
            expect( instance.props.scroll ).to.equal( 'both' );
        } );

        it( 'should be passed to both ScrollBars as orientation prop', () =>
        {
            wrapper.setProps({ scroll: 'horizontal' })
            expect( wrapper.find( ScrollBar ).first().prop( 'orientation' ) ).to.equal( 'horizontal' )
            wrapper.setProps({ scroll: 'vertical' })
            expect( wrapper.find( ScrollBar ).first().prop( 'orientation' ) ).to.equal( 'vertical' )
        } )
    } )

    describe( 'thumbSize', () =>
    {
        it( 'should be passed to the ScrollBar as thumbSize prop', () =>
        {
            instance.scrollBoxRef = { scrollLeft: 0, scrollTop: 0  };

            wrapper.setState( { thumbSize : {
                horizontal : 50,
                vertical : 100,
            } } )

            expect( wrapper.find( ScrollBar ).first().prop( 'thumbSize' ) ).to.equal( 50 )
            expect( wrapper.find( ScrollBar ).last().prop( 'thumbSize' ) ).to.equal( 100 )
        } )
    } )
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    describe( 'clickScroll', () =>
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

                wrapper.driver().scrollVertical( 250 );

                expect( onScroll.calledOnce ).to.be.true;
            } );

            it( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'horizontal'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollVertical( 10 ) )
                    .to.throw( 'Cannot scroll because scroll direction is neither \'vertical\' nor \'both\'' ); // eslint-disable-line max-len
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

                wrapper.driver().scrollHorizontal( 640 );

                expect( onScroll.calledOnce ).to.be.true;
            } );

            it( 'should throw an error when scroll direction is wrong', () =>
            {
                const props = {
                    scroll : 'vertical'
                };

                wrapper = mount( <ScrollBox { ...props } /> );

                expect( () => wrapper.driver().scrollHorizontal( 270 ) )
                    .to.throw( 'Cannot scroll because scroll direction is neither \'horizontal\' nor \'both\'' ); // eslint-disable-line max-len
            } );
        } );
    } );
} );
