const ERR = {
    ITEM_ERR : ( label, state ) =>
        `Item '${label}' cannot be clicked since it is ${state}`,
    NAV_ERR : ( el, state ) =>
        `${el} cannot onClick since it is ${state}`,
    NO_INPUT : () =>
        'There\'s no input because <mode> is not <default>',
    TIMEINPUT_ERR : ( onEvent, state ) =>
        `TimeInput cannot ${onEvent} since it is ${state}`,
};

export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
        this.header  = wrapper.find( 'DatePickerHeader' ).props().cssMap;
        this.hour    = this.header.hour;
        this.min     = this.header.min;
    }

    clickItem( index = 0 )
    {
        const dateItem = this.wrapper.find( 'DatePickerItem' )
            .at( index ).props();
        const { label } = dateItem;

        if ( dateItem.isDisabled )
        {
            throw new Error( ERR.ITEM_ERR( label, 'disabled' ) );
        }

        if ( dateItem.isReadOnly )
        {
            throw new Error( ERR.ITEM_ERR( label, 'read only' ) );
        }

        this.wrapper.find( 'DatePickerItem' ).at( index )
            .simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        if ( this.wrapper.props().prevIsDisabled )
        {
            throw new Error( ERR.NAV_ERR( 'Previous', 'disabled' ) );
        }

        this.wrapper.find( `.${this.cssMap.prev}` ).simulate( 'click' );
        return this;
    }

    clickNext()
    {
        if ( this.wrapper.props().nextIsDisabled )
        {
            throw new Error( ERR.NAV_ERR( 'Next', 'disabled' ) );
        }

        this.wrapper.find( `.${this.cssMap.next}` ).simulate( 'click' );
        return this;
    }

    keyPressHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onKeyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onKeyPress', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` )
            .simulate( 'keyPress', { key: '3' } );
        return this;
    }

    keyPressMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onKeyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onKeyPress', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` )
            .simulate( 'keyPress', { key: '8' } );
        return this;
    }

    blurHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onBlur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onBlur', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'blur' );
        return this;
    }

    blurMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onBlur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onBlur', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'blur' );
        return this;
    }

    focusHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onFocus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onFocus', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'focus' );
        return this;
    }

    focusMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onFocus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onFocus', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'focus' );
        return this;
    }

    changeHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onChange', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` )
            .simulate( 'change', { target: { value: '02' } } );
        return this;
    }

    changeMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'onChange', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` )
            .simulate( 'change', { target: { value: '23' } } );
        return this;
    }
}
