export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.find( 'input' ).first().simulate( 'blur' );
        return this;
    }

    focus()
    {
        this.wrapper.find( 'input' ).first().simulate( 'focus' );
        return this;
    }

    clickClose()
    {
        this.wrapper.find( 'Tag' ).first().driver().clickClose();
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }
}
