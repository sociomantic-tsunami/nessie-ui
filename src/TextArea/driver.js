import { InputField } from '../index';

const ERR = {
    TEXTAREA_ERR : ( onEvent, state ) =>
        `TextArea cannot ${onEvent} since it is ${state}`,
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
            throw new Error( ERR.TEXTAREA_ERR( 'onBlur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onBlur', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onClick', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onClick', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val = 'abc' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onChange', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onFocus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onFocus', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'onKeyPress', 'disabled' ) );
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
