export default class ComboBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.find( 'InputField' ).driver().blur();
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'InputField' ).driver().keyPress();
        return this;
    }

    clickIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().click();
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
        this.wrapper.find( 'InputField' ).driver().focus();
        return this;
    }

    keyPress()
    {
        this.wrapper.find( 'InputField' ).driver().keyPress();
        return this;
    }

    keyDown()
    {
        this.wrapper.find( 'InputField' ).driver().keyDown();
        return this;
    }

    keyUp()
    {
        this.wrapper.find( 'InputField' ).driver().keyUp();
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.wrapper.find( 'ListBox' ).driver().mouseOutOption( index );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        this.wrapper.find( 'ListBox' ).driver().mouseOverOption( index );
        return this;
    }

    scroll( offset = 0 )
    {
        this.wrapper.find( 'ScrollBox' ).driver().scrollVertical( offset );
        return this;
    }
}
