/* global test jest Event */
/* eslint no-console: 0*/

import React               from 'react';
import { mount, shallow }  from 'enzyme';

import ScrollBar           from './index';

describe( 'ScrollBar', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBar /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    } );


    test( 'should contain exactly two <div>’s', () =>
    {
        expect( wrapper.find( 'div' ) ).toHaveLength( 2 );
    } );

    describe( 'props', () =>
    {
        describe( 'onClickTrack', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onClickTrack ).toBeUndefined();
            } );

            test( 'should be passed to the track <div> as onClick', () =>
            {
                const onClickTrack = jest.fn();
                wrapper.setProps( { onClickTrack } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'onClick' ) )
                    .toEqual( onClickTrack );
            } );
        } );

        describe( 'onMouseDownThumb', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseDownThumb ).toBeUndefined();
            } );

            test( 'should be invoked by mouse down on thumb <div>', () =>
            {
                const onMouseDownThumb = jest.fn();
                wrapper.setProps( { onMouseDownThumb } );

                const thumbMouseDown =
                    wrapper.find( `.${cssMap.thumb}` ).prop( 'onMouseDown' );

                thumbMouseDown( new Event( { type: 'mousedown' } ) );

                expect( onMouseDownThumb ).toHaveBeenCalledTimes( 1 );
            } );
        } );

        describe( 'scrollMax', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollMax ).toEqual( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuemax', () =>
            {
                wrapper.setProps( { scrollMax: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuemax' ) ).toBe( 20 );
            } );
        } );

        describe( 'scrollMin', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollMin ).toBe( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuemin', () =>
            {
                wrapper.setProps( { scrollMin: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuemin' ) ).toBe( 20 );
            } );
        } );

        describe( 'scrollPos', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollPos ).toBe( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuenow', () =>
            {
                wrapper.setProps( { scrollPos: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuenow' ) ).toBe( 20 );
            } );
        } );
    } );
} );


describe( 'ScrollBarDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBar /> );
    } );

    describe( 'clickTrack()', () =>
    {
        test( 'should simulate click on track', () =>
        {
            const onClickTrack = jest.fn();
            wrapper.setProps( { onClickTrack } );

            wrapper.driver().clickTrack( 100 );

            expect( onClickTrack ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseDownThumb()', () =>
    {
        test( 'should simulate mouse down on thumb', () =>
        {
            const onMouseDownThumb = jest.fn();
            wrapper.setProps( { onMouseDownThumb } );

            wrapper.driver().mouseDownThumb( 100 );

            expect( onMouseDownThumb ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should simulate mouse over', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should simulate mouse out', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toHaveBeenCalledTimes( 1 );
        } );
    } );
} );
