import { TextInputWithIcon } from 'nessie-ui';

export default class PasswordInput
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getErrorMessage()
    {
        const textInputWithIcon = this.wrapper.find( TextInputWithIcon );
        return textInputWithIcon.driver().getErrorMessage();
    }

    blur()
    {
        this.wrapper.find( 'InputField' ).simulate( 'blur' );
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'InputField' ).driver().keyPress();
        return this;
    }

    clickInput()
    {
        this.wrapper.find( 'InputField' ).driver().click();
        return this;
    }

    clickOption( index = 0 )
    {
        this.wrapper.find( 'ListBox' ).driver().clickOption( index );
        return this;
    }

    focus()
    {
        this.wrapper.find( 'InputField' ).simulate( 'focus' );
        return this;
    }

    keyPress()
    {
        this.wrapper.find( 'InputField' ).driver().keyPress();
        return this;
    }
}
