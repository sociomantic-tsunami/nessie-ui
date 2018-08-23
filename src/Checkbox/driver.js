const ERR = {
    CHECKBOX_ERR : ( label, onEvent, state ) =>
        `Checkbox '${label}' cannot ${onEvent} since it is ${state}`,
};

export default class CheckboxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper
            .find( `.${this.wrapper.props().cssMap.input}` );
    }

    blur()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onBlur', 'read only' ) );
        }

        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onFocus', 'read only' ) );
        }

        this.control.simulate( 'focus' );
        return this;
    }

    change()
    {
        const props     = this.wrapper.props();
        const { label } = props;
        const node      = this.control.getNode();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onChange', 'read only' ) );
        }

        node.checked = !node.checked;
        this.control.simulate( 'change' );
        return this;
    }

    click()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onClick', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onClick', 'read only' ) );
        }

        this.control.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onMouseOver', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
