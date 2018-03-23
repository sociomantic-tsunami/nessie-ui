import React                    from 'react';
import { mount }                from 'enzyme';

import { DateTimeInput }        from '../index';

describe.only( 'DateTimeInputDriver', () =>
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
        it( 'should get main input value', () =>
        {
            wrapper.setProps( {
                inputValue : '2018-05-05 12:00'
            } );

            expect( driver.getMainInputValue() ).to.equal( '2018-05-05 12:00' );
        } );
    } );

    describe( 'setMainInputValue()', () =>
    {
        it( 'should set main input value', () =>
        {
            wrapper.driver().setMainInputValue( '2018-05-05 12:00' );

            expect( driver.getMainInputValue() ).to.equal( '2018-05-05 12:00' );
        } );
    } );

    describe( 'blurMainInput()', () =>
    {
        it( 'should call onBlur once', () =>
        {
            const onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurMainInput();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focusMainInput()', () =>
    {
        it( 'should call onFocus once', () =>
        {
            const onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMainInput();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );


    describe( 'getHourInputValue()', () =>
    {
        it( 'should get hour input value', () =>
        {
            wrapper.setProps( {
                hourValue : '13'
            } );

            expect( driver.getHourInputValue() ).to.equal( '13' );
        } );
    } );

    describe( 'setHourInputValue()', () =>
    {
        it( 'should set hour input value', () =>
        {
            wrapper.driver().setHourInputValue( '21' );

            expect( driver.getHourInputValue() ).to.equal( '21' );
        } );
    } );

    describe( 'blurHourInput()', () =>
    {
        it( 'should call onBlur once', () =>
        {
            const onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurHourInput();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focusHourInput()', () =>
    {
        it( 'should call onFocus once', () =>
        {
            const onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusHourInput();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );


    describe( 'getMinuteInputValue()', () =>
    {
        it( 'should get minute input value', () =>
        {
            wrapper.setProps( {
                minuteValue : '45'
            } );

            expect( driver.getMinuteInputValue() ).to.equal( '45' );
        } );
    } );

    describe( 'setMinuteInputValue()', () =>
    {
        it( 'should set minute input value', () =>
        {
            wrapper.driver().setMinuteInputValue( '37' );

            expect( driver.getMinuteInputValue() ).to.equal( '37' );
        } );
    } );

    describe( 'blurMinuteInput()', () =>
    {
        it( 'should call onBlur once', () =>
        {
            const onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blurMinuteInput();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focusMinuteInput()', () =>
    {
        it( 'should call onFocus once', () =>
        {
            const onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focusMinuteInput();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );


    describe( 'clickCellByIndex()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = sinon.spy();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        it( 'should fire onClickCell exactly once', () =>
        {
            wrapper.driver().clickCellByIndex( 1 );

            expect( onClickCell.calledOnce ).to.be.true;
        } );

        it( 'should click on cell with given index', () =>
        {
            wrapper.driver().clickCellByIndex( 1 );
            expect( onClickCell.lastCall.args[ 0 ] ).to.equal( '2' );
        } );
    } );

    describe( 'clickCellByValue()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = sinon.spy();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        it( 'should fire onClickCell exactly once', () =>
        {
            wrapper.driver().clickCellByValue( '1' );

            expect( onClickCell.calledOnce ).to.be.true;
        } );

        it( 'should click on cell with given value', () =>
        {
            wrapper.driver().clickCellByValue( '3' );
            expect( onClickCell.lastCall.args[ 0 ] ).to.equal( '3' );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        let onClickPrev;

        it( 'should fire onClickPrev exactly once', () =>
        {
            onClickPrev = sinon.spy();
            wrapper.setProps( {
                onClickPrev
            } );

            wrapper.driver().clickPrev();

            expect( onClickPrev.calledOnce ).to.be.true;
        } );
    } );


    describe( 'clickNext()', () =>
    {
        let onClickNext;

        it( 'should fire onClickNext exactly once', () =>
        {
            onClickNext = sinon.spy();
            wrapper.setProps( {
                onClickNext
            } );

            wrapper.driver().clickNext();

            expect( onClickNext.calledOnce ).to.be.true;
        } );
    } );
} );
