/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global jest test */
/* eslint-disable no-magic-numbers */

import React                    from 'react';
import { mount }                from 'enzyme';

import { DateTimeInput }        from '../index';

describe( 'DateTimeInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <DateTimeInput /> );
        driver   = wrapper.driver();
    } );

    describe( 'getMainInputValue()', () =>
    {
        test( 'should get main input value', () =>
        {
            wrapper.setProps( {
                inputValue : '2018-05-05 12:00'
            } );

            expect( driver.getMainInputValue() ).toBe( '2018-05-05 12:00' );
        } );
    } );

    describe( 'setMainInputValue()', () =>
    {
        test( 'should set main input value', () =>
        {
            wrapper.driver().setMainInputValue( '2018-05-05 12:00' );

            expect( driver.getMainInputValue() ).toBe( '2018-05-05 12:00' );
        } );
    } );

    describe( 'blurMainInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurMainInput();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusMainInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMainInput();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'getHourInputValue()', () =>
    {
        test( 'should get hour input value', () =>
        {
            wrapper.setProps( {
                hourValue : '13'
            } );

            expect( driver.getHourInputValue() ).toBe( '13' );
        } );
    } );

    describe( 'setHourInputValue()', () =>
    {
        test( 'should set hour input value', () =>
        {
            wrapper.driver().setHourInputValue( '21' );

            expect( driver.getHourInputValue() ).toBe( '21' );
        } );
    } );

    describe( 'blurHourInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurHourInput();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusHourInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusHourInput();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'getMinuteInputValue()', () =>
    {
        test( 'should get minute input value', () =>
        {
            wrapper.setProps( {
                minuteValue : '45'
            } );

            expect( driver.getMinuteInputValue() ).toBe( '45' );
        } );
    } );

    describe( 'setMinuteInputValue()', () =>
    {
        test( 'should set minute input value', () =>
        {
            wrapper.driver().setMinuteInputValue( '37' );

            expect( driver.getMinuteInputValue() ).toBe( '37' );
        } );
    } );

    describe( 'blurMinuteInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurMinuteInput();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusMinuteInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMinuteInput();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickCellByIndex()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = jest.fn();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        test( 'should fire onClickCell exactly once', () =>
        {
            wrapper.driver().clickCellByIndex( 1 );

            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given index', () =>
        {
            wrapper.driver().clickCellByIndex( 1 );
            expect( onClickCell.mock.calls[ 0 ][ 0 ] ).toBe( '2' );
        } );
    } );

    describe( 'clickCellByValue()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = jest.fn();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        test( 'should fire onClickCell exactly once', () =>
        {
            wrapper.driver().clickCellByValue( '1' );

            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given value', () =>
        {
            wrapper.driver().clickCellByValue( '3' );
            expect( onClickCell.mock.calls[ 0 ][ 0 ] ).toBe( '3' );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        let onClickPrev;

        test( 'should fire onClickPrev exactly once', () =>
        {
            onClickPrev = jest.fn();
            wrapper.setProps( {
                onClickPrev
            } );

            wrapper.driver().clickPrev();

            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickNext()', () =>
    {
        let onClickNext;

        test( 'should fire onClickNext exactly once', () =>
        {
            onClickNext = jest.fn();
            wrapper.setProps( {
                onClickNext
            } );

            wrapper.driver().clickNext();

            expect( onClickNext ).toBeCalledTimes( 1 );
        } );
    } );
} );
