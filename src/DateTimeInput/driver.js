export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper     = wrapper;
        this.cssMap      = wrapper.children().props().cssMap;

        this.mainInput   = wrapper.find( `.${this.cssMap.input}` );
        this.hourInput   = wrapper.find( `.${this.cssMap.hour}` );
        this.minuteInput = wrapper.find( `.${this.cssMap.min}` );
        this.calendar    = wrapper.find( 'DatePicker' );
        this.prev        = wrapper.find( `.${this.cssMap.prev}` );
        this.next        = wrapper.find( `.${this.cssMap.next}` );
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
        this.calendar.driver().clickItem( index );
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

    clickIcon()
    {
        this.wrapper.find( 'IconButton' ).first().driver().click();
        return this;
    }

    keyPressInput()
    {
        this.wrapper.driver().keyPressInput();
        return this;
    }

    keyPressHour()
    {
        this.calendar.driver().keyPressHour();
        return this;
    }

    keyPressMinute()
    {
        this.calendar.driver().keyPressMinute();
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
