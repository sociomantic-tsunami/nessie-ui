const ERRORS = {
    CHECKBOX_CANNOT_BE_CLICKED : ( label, state ) =>
        `Checkbox '${label}' cannot be clicked since it is ${state}`,
    CHECKBOX_CANNOT_BE_CHANGED : ( label, state ) =>
        `Checkbox '${label}' cannot be changed since it is ${state}`,
    CHECKBOX_CANNOT_BE_BLURED : ( label, state ) =>
        `Checkbox '${label}' cannot have blur since it is ${state}`,
    CHECKBOX_CANNOT_BE_FOCUSED : ( label, state ) =>
        `Checkbox '${label}' cannot have focus since it is ${state}`,
    CHECKBOX_CANNOT_MOUSEOVER : ( label, state ) =>
        `Checkbox '${label}' cannot have onMouseOver since it is ${state}`,
    CHECKBOX_CANNOT_MOUSEOUT : ( label, state ) =>
        `Checkbox '${label}' cannot have onMouseOut since it is ${state}`,
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_BLURED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_BLURED( label, 'read only' ) );
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_FOCUSED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_FOCUSED( label, 'read only' ) );
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_CHANGED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_CHANGED( label, 'read only' ) );
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_CLICKED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_BE_CLICKED( label, 'read only' ) );
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_MOUSEOVER( label, 'disabled' ) );
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
            throw new Error( ERRORS
                .CHECKBOX_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
