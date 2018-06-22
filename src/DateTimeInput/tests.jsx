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

            expect( onBlur ).toBeCalled();
        } );
    } );

    describe( 'focusMainInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMainInput();

            expect( onFocus ).toBeCalled();
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

            expect( onBlur ).toBeCalled();
        } );
    } );

    describe( 'focusHourInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusHourInput();

            expect( onFocus ).toBeCalled();
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

            expect( onBlur ).toBeCalled();
        } );
    } );

    describe( 'focusMinuteInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMinuteInput();

            expect( onFocus ).toBeCalled();
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

            expect( onClickCell ).toBeCalled();
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

            expect( onClickCell ).toBeCalled();
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

            expect( onClickPrev ).toBeCalled();
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

            expect( onClickNext ).toBeCalled();
        } );
    } );
} );
