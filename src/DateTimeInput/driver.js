export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper     = wrapper;
        this.cssMap      = this.wrapper.children().props().cssMap;

        this.mainInput   = wrapper.find( `.${this.cssMap.input}` );
        this.hourInput   = wrapper.find( `.${this.cssMap.hour}` );
        this.minuteInput = wrapper.find( `.${this.cssMap.min}` );
        this.calendar    = wrapper.find( 'DatePickerItem' );
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
