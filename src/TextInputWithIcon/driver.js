export default class TextInputWithIconDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.inputfield = wrapper.find( 'InputField' );
        this.tooltip    = wrapper.find( 'Tooltip' );
        this.iconbutton = wrapper.find( 'IconButton' );
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
        this.inputfield.driver().mouseOver();
        return this;
    }

    mouseOut()
    {
        this.inputfield.driver().mouseOut();
        return this;
    }

    clickIcon()
    {
        this.iconbutton.driver().click();
        return this;
    }

    focusIcon()
    {
        this.iconbutton.driver().focus();
        return this;
    }

    blurIcon()
    {
        this.iconbutton.driver().blur();
        return this;
    }

    mouseOverIcon()
    {
        this.tooltip.driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.tooltip.driver().mouseOut();
        return this;
    }
}
