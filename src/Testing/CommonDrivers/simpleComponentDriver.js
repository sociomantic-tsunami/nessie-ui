export default class SimpleComponentDriver
{
    constructor( wrapper, selector )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( selector ).first();
        this.cssMap = this.wrapper.props().cssMap;
    }

    focus()
    {
        this.control.simulate( 'focus' );
        return this;
    }

    blur()
    {
        this.control.simulate( 'blur' );
        return this;
    }

    mouseOver()
    {
        this.control.simulate( 'mouseover' );
        return this;
    }

    mouseOut()
    {
        this.control.simulate( 'mouseout' );
        return this;
    }
}
