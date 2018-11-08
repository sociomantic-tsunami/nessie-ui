import { InputField } from 'nessie-ui';

const ERR = {
    TEXTINPUT_ERR : ( event, state ) =>
        `TextInput cannot simulate ${event} since it is ${state}`,
};

export default class TextInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'blur', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'click', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'focus', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress( keyCode );
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
