const ERRORS = {
    ELEMENT_CANNOT_BE_CLICKED : ( label, state ) =>
        `Item '${label}' cannot be clicked since it is ${state}`,
    INPUT_CANNOT_BE_CHANGED : ( state ) =>
        `Input cannot be changed since it is ${state}`,
    INPUT_CANNOT_KEYPRESS : ( state ) =>
        `Input didn't trigger onKeyPress since it is ${state}`,
    NAV_CANNOT_BE_CLICKED : ( el, state ) =>
        `${el} cannot be clicked since it is ${state}`,
    NO_INPUT : () =>
        'There\'s no input because <mode> is not <default>',
    HOUR_INPUT_CANNOT_BE_BLURED : ( state ) =>
        `Hour input cannot have blur since it is ${state}`,
    HOUR_INPUT_CANNOT_BE_FOCUSED : ( state ) =>
        `Hour input cannot have focus since it is ${state}`,
    MIN_INPUT_CANNOT_BE_BLURED : ( state ) =>
        `Minute input cannot have blur since it is ${state}`,
    MIN_INPUT_CANNOT_BE_FOCUSED : ( state ) =>
        `Minute input cannot have focus since it is ${state}`,
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
            throw new Error( ERRORS.ELEMENT_CANNOT_BE_CLICKED(
                label,
                'disabled',
            ) );
        }

        if ( dateItem.isReadOnly )
        {
            throw new Error( ERRORS.ELEMENT_CANNOT_BE_CLICKED(
                label,
                'read only',
            ) );
        }

        this.wrapper.find( 'DatePickerItem' ).at( index )
            .simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        if ( this.wrapper.props().prevIsDisabled )
        {
            throw new Error( ERRORS.NAV_CANNOT_BE_CLICKED(
                'Previous',
                'disabled',
            ) );
        }

        this.wrapper.find( `.${this.cssMap.prev}` ).simulate( 'click' );
        return this;
    }

    clickNext()
    {
        if ( this.wrapper.props().nextIsDisabled )
        {
            throw new Error( ERRORS.NAV_CANNOT_BE_CLICKED(
                'Next',
                'disabled',
            ) );
        }

        this.wrapper.find( `.${this.cssMap.next}` ).simulate( 'click' );
        return this;
    }

    keyPressHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_KEYPRESS( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_KEYPRESS( 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` )
            .simulate( 'keyPress', { key: '3' } );
        return this;
    }

    keyPressMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_KEYPRESS( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_KEYPRESS( 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` )
            .simulate( 'keyPress', { key: '8' } );
        return this;
    }

    blurHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .HOUR_INPUT_CANNOT_BE_BLURED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .HOUR_INPUT_CANNOT_BE_BLURED( 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'blur' );
        return this;
    }

    blurMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .MIN_INPUT_CANNOT_BE_BLURED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .MIN_INPUT_CANNOT_BE_BLURED( 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'blur' );
        return this;
    }

    focusHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .HOUR_INPUT_CANNOT_BE_FOCUSED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .HOUR_INPUT_CANNOT_BE_FOCUSED( 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'focus' );
        return this;
    }

    focusMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .MIN_INPUT_CANNOT_BE_FOCUSED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .MIN_INPUT_CANNOT_BE_FOCUSED( 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'focus' );
        return this;
    }

    changeHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_BE_CHANGED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_BE_CHANGED( 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` )
            .simulate( 'change', { target: { value: '02' } } );
        return this;
    }

    changeMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERRORS.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_BE_CHANGED( 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERRORS
                .INPUT_CANNOT_BE_CHANGED( 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` )
            .simulate( 'change', { target: { value: '23' } } );
        return this;
    }
}
