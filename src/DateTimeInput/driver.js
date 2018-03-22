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
    }

    getMainInputValue()
    {
        return this.mainInput.node.value;
    }

    setMainInputValue( value )
    {
        const newValue = ( value == null ) ? '' : String( value );
        const $input = this.mainInput;

        $input.node.value = value;
        $input.simulate( 'change', { target: { value: newValue } } );

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
        return this.hourInput.node.value;
    }

    setHourInputValue( value )
    {
        const newValue = ( value == null ) ? '' : String( value );

        this.hourInput.node.value = value;
        this.hourInput.simulate( 'change', { target: { value: newValue } } );

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
        return this.minuteInput.node.value;
    }

    setMinuteInputValue( value )
    {
        const newValue = ( value == null ) ? '' : String( value );

        this.minuteInput.node.value = value;
        this.minuteInput.simulate( 'change', { target: { value: newValue } } );

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

    clickCellByIndex( index )
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
}
