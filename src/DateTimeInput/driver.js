/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper     = wrapper;
        this.cssMap      = wrapper.props().cssMap;
        this.mainInput   = wrapper.find( 'input' ).at( 0 );
        this.hourInput   = wrapper.find( 'input' ).at( 1 );
        this.minuteInput = wrapper.find( 'input' ).at( 2 );
        this.calendar    = wrapper.find( 'table button' );
        this.prev        = wrapper.find( 'button' ).at( 1 );
        this.next        = wrapper.find( 'button' ).at( 2 );
    }

    getMainInputValue()
    {
        return this.mainInput.getNode().value;
    }

    setMainInputValue( value )
    {
        const node = this.mainInput.getNode();

        node.value = value;
        this.mainInput.simulate( 'change' );

        return this;
    }

    blurMainInput()
    {
        this.mainInput.simulate( 'blur' );
        return this;
    }

    focusMainInput()
    {
        this.mainInput.simulate( 'focus' );
        return this;
    }

    getHourInputValue()
    {
        return this.hourInput.getNode().value;
    }

    setHourInputValue( value )
    {
        const node = this.hourInput.getNode();

        node.value = value;
        this.hourInput.simulate( 'change' );

        return this;
    }

    blurHourInput()
    {
        this.hourInput.simulate( 'blur' );
        return this;
    }

    focusHourInput()
    {
        this.hourInput.simulate( 'focus' );
        return this;
    }

    getMinuteInputValue()
    {
        return this.minuteInput.getNode().value;
    }

    setMinuteInputValue( value )
    {
        const node = this.minuteInput.getNode();

        node.value = value;
        this.minuteInput.simulate( 'change' );

        return this;
    }

    blurMinuteInput()
    {
        this.minuteInput.simulate( 'blur' );
        return this;
    }

    focusMinuteInput()
    {
        this.minuteInput.simulate( 'focus' );
        return this;
    }

    clickCellByIndex( index = 0 )
    {
        const day = this.calendar.at( index );
        day.simulate( 'click' );
        return this;
    }

    clickCellByValue( value )
    {
        const day = this.calendar.findWhere( n =>
            n.prop( 'value' ) === value ).first();
        day.simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        this.prev.simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.next.simulate( 'click' );
        return this;
    }
}
