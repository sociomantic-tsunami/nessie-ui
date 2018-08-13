export default class TextInputWithIconDriver
{
    constructor( wrapper )
    {
        this.wrapper        = wrapper;
        this.inputcontainer = wrapper.find( 'InputContainer' );
        this.inputfield     = wrapper.find( 'InputField' );
    }

    change( val )
    {
        this.inputfield.driver().change( val );
        return this;
    }

    click()
    {
        this.inputfield.driver().click();
        return this;
    }

    keyDown()
    {
        this.inputfield.driver().keyDown();
        return this;
    }

    keyPress()
    {
        this.inputfield.driver().keyPress();
        return this;
    }

    keyUp()
    {
        this.inputfield.driver().keyUp();
        return this;
    }

    focus()
    {
        this.inputfield.driver().focus();
        return this;
    }

    blur()
    {
        this.inputfield.driver().blur();
        return this;
    }

    mouseOver()
    {
        this.inputcontainer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.inputcontainer.simulate( 'mouseleave' );
        return this;
    }

    clickIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().click();
        return this;
    }

    focusIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().focus();
        return this;
    }

    blurIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().blur();
        return this;
    }

    mouseOverIcon()
    {
        this.wrapper.find( 'Tooltip' ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.wrapper.find( 'Tooltip' ).driver().mouseOut();
        return this;
    }
}
