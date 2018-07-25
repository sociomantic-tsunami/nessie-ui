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

    focus()
    {
        this.wrapper.find( 'InputField' ).simulate( 'focus' );
        return this;
    }

    blurIcon()
    {
        this.wrapper.find( 'Icon' ).simulate( 'blur' );
        return this;
    }

    focusIcon()
    {
        this.wrapper.find( 'Icon' ).simulate( 'focus' );
        return this;
    }

    change()
    {
        this.wrapper.simulate( 'change' );
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

    keyPress()
    {
        this.wrapper.find( 'InputField' ).driver().keyPress();
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
