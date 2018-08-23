const ERR = {
    BUTTON_ERR : ( label, onEvent, state ) =>
        `Button '${label}' cannot ${onEvent} since it is ${state}`,
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
            throw new Error( ERR
                .BUTTON_ERR( label, 'onClick', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onClick', 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onClick', 'loading' ) );
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
            throw new Error( ERR
                .BUTTON_ERR( label, 'onMouseOver', 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onMouseOver', 'loading' ) );
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
            throw new Error( ERR
                .BUTTON_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onMouseOut', 'loading' ) );
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
            throw new Error( ERR
                .BUTTON_ERR( label, 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onFocus', 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onFocus', 'loading' ) );
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
            throw new Error( ERR
                .BUTTON_ERR( label, 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onBlur', 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR
                .BUTTON_ERR( label, 'onBlur', 'loading' ) );
        }

        this.button.simulate( 'blur' );
        return this;
    }
}
