export default class SimpleComponentDriver
{
    constructor( wrapper, selector )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( selector ).first();
        this.cssMap  = this.wrapper.props().cssMap;
    }

    blur()
    {
        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        this.control.simulate( 'focus' );
        return this;
    }

    mouseOut()
    {
        this.control.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.control.simulate( 'mouseenter' );
        return this;
    }

    click()
    {
        this.control.simulate( 'click' );
        return this;
    }
}
