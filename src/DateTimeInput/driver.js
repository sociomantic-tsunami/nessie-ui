export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper     = wrapper;
        this.cssMap      = wrapper.prop( 'cssMap' );
        this.mainInput   = wrapper.find( 'input' ).at( 0 );
        this.hourInput   = wrapper.find( 'input' ).at( 1 );
        this.minuteInput = wrapper.find( 'input' ).at( 2 );
        this.calendar    = wrapper.find( 'table button' );
        this.prev        = wrapper.find( 'button' ).at( 1 );
        this.next        = wrapper.find( 'button' ).at( 2 );
    }

    getMainInputValue()
    {
        return this.mainInput.instance().value;
    }

    setMainInputValue( value )
    {
        const node = this.mainInput.instance();

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
        return this.hourInput.instance().value;
    }

    setHourInputValue( value )
    {
        const node = this.hourInput.instance();

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
        return this.minuteInput.instance().value;
    }

    setMinuteInputValue( value )
    {
        const node = this.minuteInput.instance();

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
