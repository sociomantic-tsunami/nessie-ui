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


    describe( 'blurMainInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurMainInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusMainInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusMainInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blurHourInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurHourInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusHourInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusHourInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blurMinuteInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurMinuteInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusMinuteInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusMinuteInput();
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
            driver.clickCellByIndex( 1 );
            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given index', () =>
        {
            driver.clickCellByIndex( 1 );
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
            driver.clickCellByValue( '1' );
            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given value', () =>
        {
            driver.clickCellByValue( '3' );
            expect( onClickCell.mock.calls[ 0 ][ 0 ] ).toBe( '3' );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        test( 'should fire onClickPrev exactly once', () =>
        {
            const onClickPrev = jest.fn();
            wrapper.setProps( {
                onClickPrev,
            } );

            driver.clickPrev();
            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickNext()', () =>
    {
        test( 'should fire onClickNext exactly once', () =>
        {
            const onClickNext = jest.fn();
            wrapper.setProps( {
                onClickNext,
            } );

            driver.clickNext();
            expect( onClickNext ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickIcon()', () =>
    {
        test( 'should fire onClickIcon exactly once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( {
                onClickIcon,
            } );

            driver.clickIcon();
            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPressHour()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressHour();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPressMinute()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressMinute();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
