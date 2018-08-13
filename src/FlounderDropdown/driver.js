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
        this.control.prop( 'onChange' )( {
            simulate :
            { change: { target: { value } } },
        } );
        return this;
    }

    close()
    {
        this.control.prop( 'onClose' )( 'close' );
        return this;
    }

    firstTouch()
    {
        this.control.prop( 'onFirstTouch' )( 'touch' );
        return this;
    }

    open()
    {
        this.control.prop( 'onOpen' )( 'open' );
        return this;
    }

    openOnHover()
    {
        this.control.prop( 'onOpenOnHover' )( 'openOnHover' );
        return this;
    }

    focus()
    {
        this.control.prop( 'onFocus' )( 'focus' );
        return this;
    }

    blur()
    {
        this.control.prop( 'onBlur' )( 'blur' );
        return this;
    }

    mouseOver()
    {
        this.control.prop( 'onMouseOver' )( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.control.prop( 'onMouseOut' )( 'mouseleave' );
        return this;
    }
}
