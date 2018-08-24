import { InputField } from '../index';

const ERR = {
    TEXTAREA_ERR : ( event, state ) =>
        `TextArea cannot simulate ${event} since it is ${state}`,
};

export default class TextAreaDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'blur', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'click', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val = 'abc' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'focus', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress();
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
