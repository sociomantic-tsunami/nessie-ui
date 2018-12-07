/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React               from 'react';
import { mount, shallow }  from 'enzyme';

import { ScrollBar }       from '../index';
import styles              from './scrollBar.css';

const { cssMap } = ScrollBar.defaultProps;

describe( 'ScrollBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBar cssMap = { styles } /> );
    } );


    test( 'should contain exactly two <div>’s', () =>
    {
        expect( wrapper.find( 'div' ) ).toHaveLength( 2 );
    } );

    describe( 'props', () =>
    {
        describe( 'scrollMax', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( ScrollBar.defaultProps.scrollMax ).toEqual( 0 );
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
                expect( ScrollBar.defaultProps.scrollMin ).toBe( 0 );
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
                expect( ScrollBar.defaultProps.scrollPos ).toBe( 0 );
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
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBar cssMap = { styles } /> );
        driver  = wrapper.driver();
    } );

    describe( 'clickTrack( val )', () =>
    {
        let onClickTrack;

        beforeEach( () =>
        {
            onClickTrack = jest.fn();
            wrapper.setProps( { onClickTrack } );
            driver.clickTrack( 100 );
        } );

        test( 'should call the onClickTrack prop once', () =>
        {
            expect( onClickTrack ).toHaveBeenCalledTimes( 1 );
        } );

        test( 'should call the onClickTrack prop with val', () =>
        {
            expect( onClickTrack ).toBeCalledWith( 100 );
        } );
    } );

    describe( 'change( val )', () =>
    {
        let onChange;

        beforeEach( () =>
        {
            onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.change( 100 );
        } );

        test( 'should trigger onChange callback prop once', () =>
        {
            expect( onChange ).toHaveBeenCalledTimes( 1 );
        } );

        test( 'should call the onChange prop with val', () =>
        {
            expect( onChange ).toBeCalledWith( 100 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toHaveBeenCalledTimes( 1 );
        } );
    } );
} );
