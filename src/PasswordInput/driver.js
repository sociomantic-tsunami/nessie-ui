export default class PasswordInput
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

    focus()
    {
        this.wrapper.find( 'InputField' ).driver().focus();
        return this;
    }

    change()
    {
        this.wrapper.simulate( 'change', { target: { value: 'Cthulhu' } } );
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'InputField' ).driver().change();
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

    clickIcon()
    {
        this.wrapper.find( 'IconButton' ).simulate( 'click' );
        return this;
    }

    mouseOverIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.wrapper.find( 'IconButton' ).driver().mouseOut();
        return this;
    }
}
