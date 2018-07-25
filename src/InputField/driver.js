export default class InputFieldDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = this.wrapper.find( 'input' ).first();
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

    click()
    {
        this.control.simulate( 'click' );
        return this;
    }

    keyPress()
    {
        this.control.simulate( 'keyPress' );
        this.control.simulate( 'change' );
        return this;
    }

    keyDown()
    {
        this.control.simulate( 'keyDown', { keyCode: 49 } );
        this.control.simulate( 'change' );
        return this;
    }

    keyUp()
    {
        this.control.simulate( 'keyUp', { keyCode: 49 } );
        this.control.simulate( 'change' );
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
