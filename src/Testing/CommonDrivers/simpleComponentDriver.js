import WrapperDriver from './wrapperDriver';

export default class SimpleComponentDriver extends WrapperDriver
{
    constructor( wrapper, selector )
    {
        super( wrapper, selector );
        this.wrapper = wrapper;
        this.control = wrapper.find( selector ).first();
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
