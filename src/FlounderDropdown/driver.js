/**
 * Driver for flounder dropdown driver. The flounder dropdown uses currently
 * a non React control. This renders Enzyme useless in many cases and a manual
 * approach is used. If the control changes to React please extend
 * InputComponentDriver.
 * When this will happen the following methods could be developed easily:
 * Search, SearchAndChoose (through change text)
 * ToggleDropdownOptions (through click/hover)
 *
 * otherwise I think it's possible to change the elements through
 * this.flounderControl.refs and re-render the wrapper.
 */
export default class FlounderDropdownDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        this.control = wrapper.find( 'InputContainer' );
        // the 3rd party control
        this.innerFlounderComponent = wrapper.node.flounderInstance;
    }

    change( value = 'jkl' )
    {
        this.innerFlounderComponent.onChange( value );
        return this;
    }

    close()
    {
        this.innerFlounderComponent.onClose();
        return this;
    }

    open()
    {
        this.innerFlounderComponent.onOpen();
        return this;
    }

    firstTouch()
    {
        this.innerFlounderComponent.onFirstTouch();
        return this;
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
        this.control.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.control.simulate( 'mouseleave' );
        return this;
    }
}
