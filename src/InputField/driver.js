const ERR = {
    INPUTFIELD_ERROR : ( event, state ) =>
        `InputField cannot simulate ${event} since it is ${state}`,
};

export default class InputFieldDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'blur', 'disabled' ) );
        }

        this.wrapper.simulate( 'blur' );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'focus', 'disabled' ) );
        }

        this.wrapper.simulate( 'focus' );
        return this;
    }

    change( val, input = 'input' )
    {
        const node = this.wrapper.find( input ).getNode();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'change', 'read only' ) );
        }

        node.value = val;
        this.wrapper.simulate( 'change' );

        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'click', 'disabled' ) );
        }

        this.wrapper.simulate( 'click' );
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyPress', { keyCode } );
        return this;
    }

    keyDown( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'keyDown', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyDown', { keyCode } );
        return this;
    }

    keyUp( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUTFIELD_ERROR( 'keyUp', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyUp', { keyCode } );
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
