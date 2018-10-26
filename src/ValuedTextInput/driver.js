import { InputField } from 'nessie-ui';

const ERR = {
    VALUEDTEXTINPUT_ERR : ( event, state ) =>
        `ValuedTextInput cannot simulate ${event} since it is ${state}`,
};

export default class ValuedTextInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'blur', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'click', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.VALUEDTEXTINPUT_ERR( 'focus', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .VALUEDTEXTINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress( keyCode );
        return this;
    }

    mouseOver()
    {
        this.wrapper.find( 'InputContainer' ).simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.find( 'InputContainer' ).simulate( 'mouseleave' );
        return this;
    }
}
