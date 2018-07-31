const ERRORS = {
    ELEMENT_CANNOT_BE_CLICKED : ( el, label, state ) =>
        `'${el}' '${label}' cannot be clicked since it is ${state}`,
    NAV_CANNOT_BE_CLICKED : ( el, state ) =>
        `${el} cannot be clicked since it is ${state}`,
    BUTTON_CANNOT_BE_BLURED : ( label, state ) =>
        `Button '${label}' cannot have blur since it is ${state}`,
    BUTTON_CANNOT_BE_FOCUSED : ( label, state ) =>
        `Button '${label}' cannot have focus since it is ${state}`,
    BUTTON_CANNOT_MOUSEOVER : ( label, state ) =>
        `Button '${label}' cannot have onMouseOver since it is ${state}`,
    BUTTON_CANNOT_MOUSEOUT : ( label, state ) =>
        `Button '${label}' cannot have onMouseOut since it is ${state}`,
};

export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
        this.header  = this.wrapper.find( 'DatePickerHeader' ).props().cssMap;
    }

    clickItem( index = 0 )
    {
        const dateItem = this.wrapper.find( 'DatePickerItem' )
            .at( index ).props();
        const { label } = dateItem;

        if ( dateItem.isDisabled )
        {
            throw new Error( ERRORS.ELEMENT_CANNOT_BE_CLICKED(
                'Item',
                label,
                'disabled',
            ) );
        }

        if ( dateItem.isReadOnly )
        {
            throw new Error( ERRORS.ELEMENT_CANNOT_BE_CLICKED(
                'Item',
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

        this.wrapper.find( `.${this.header.prev}` ).simulate( 'click' );
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

        this.wrapper.find( `.${this.header.next}` ).simulate( 'click' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress' );
        return this;
    }

    blur()
    {
        this.wrapper.find( `.${this.header.hour}` ).simulate( 'blur' );
        return this;
    }

    focus()
    {
        this.wrapper.find( `.${this.header.min}` ).simulate( 'focus' );
        return this;
    }

    change()
    {
        this.wrapper.find( `.${this.header.hour}` ).simulate( 'change' );
        return this;
    }
}
