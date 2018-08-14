const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) =>
        `Button '${label}' cannot be clicked since it is ${state}`,
    BUTTON_CANNOT_BE_BLURED : ( label, state ) =>
        `Button '${label}' cannot have blur since it is ${state}`,
    BUTTON_CANNOT_BE_FOCUSED : ( label, state ) =>
        `Button '${label}' cannot have focus since it is ${state}`,
    BUTTON_CANNOT_MOUSEOVER : ( label, state ) =>
        `Button '${label}' cannot have onMouseOver since it is ${state}`,
    BUTTON_CANNOT_MOUSEOUT : ( label, state ) =>
        `Button '${label}' cannot have onMouseOut since it is ${state}`,
};

export default class ButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.button  = wrapper
            .find( `.${this.wrapper.props().cssMap.default}` ).first();
    }

    click()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'loading' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_MOUSEOVER( label, 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_MOUSEOVER( label, 'loading' ) );
        }

        this.button.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_MOUSEOUT( label, 'loading' ) );
        }

        this.button.simulate( 'mouseleave' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_FOCUSED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_FOCUSED( label, 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_FOCUSED( label, 'loading' ) );
        }

        this.button.simulate( 'focus' );
        return this;
    }

    blur()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_BLURED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_BLURED( label, 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_BLURED( label, 'loading' ) );
        }

        this.button.simulate( 'blur' );
        return this;
    }
}
