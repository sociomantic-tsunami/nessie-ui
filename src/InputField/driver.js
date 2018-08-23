const ERR = {
    INPUTFIELD_ERROR : ( onEvent, state ) =>
        `InputField can't ${onEvent} since it is ${state}`,
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
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'blur', 'read only' ) );
        }

        this.wrapper.simulate( 'blur' );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'focus', 'read only' ) );
        }

        this.wrapper.simulate( 'focus' );
        return this;
    }

    change( value = 'a' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'change', 'read only' ) );
        }

        this.wrapper.simulate( 'change', { target: { value } } );
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'click', 'read only' ) );
        }

        this.wrapper.simulate( 'click' );
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyPress', 'read only' ) );
        }

        this.wrapper.simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }

    keyDown()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyDown', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyDown', 'read only' ) );
        }

        this.wrapper.simulate( 'keyDown', { keyCode: 49 } );
        return this;
    }

    keyUp()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyUp', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'keyUp', 'read only' ) );
        }

        this.wrapper.simulate( 'keyUp', { keyCode: 49 } );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'mouseOver', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'mouseOver', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'mouseOut', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .INPUTFIELD_ERROR( 'mouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
