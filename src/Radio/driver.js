const ERRORS = {
    RADIO_CANNOT_BE_CLICKED : ( label, state ) =>
        `Radio '${label}' cannot be clicked since it is ${state}`,
    RADIO_CANNOT_BE_CHANGED : ( label, state ) =>
        `Radio '${label}' cannot be changed since it is ${state}`,
    RADIO_CANNOT_BE_BLURED : ( label, state ) =>
        `Radio '${label}' cannot have blur since it is ${state}`,
    RADIO_CANNOT_BE_FOCUSED : ( label, state ) =>
        `Radio '${label}' cannot have focus since it is ${state}`,
    RADIO_CANNOT_MOUSEOVER : ( label, state ) =>
        `Radio '${label}' cannot have onMouseOver since it is ${state}`,
    RADIO_CANNOT_MOUSEOUT : ( label, state ) =>
        `Radio '${label}' cannot have onMouseOut since it is ${state}`,
};

export default class RadioDriver
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
                .RADIO_CANNOT_BE_BLURED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .RADIO_CANNOT_BE_BLURED( label, 'read only' ) );
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
                .RADIO_CANNOT_BE_FOCUSED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .RADIO_CANNOT_BE_FOCUSED( label, 'read only' ) );
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
                .RADIO_CANNOT_BE_CHANGED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .RADIO_CANNOT_BE_CHANGED( label, 'read only' ) );
        }

        if ( node.checked !== true )
        {
            node.checked = true;
            this.control.simulate( 'change' );
            return this;
        }

        return this;
    }

    click()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .RADIO_CANNOT_BE_CLICKED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .RADIO_CANNOT_BE_CLICKED( label, 'read only' ) );
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
                .RADIO_CANNOT_MOUSEOVER( label, 'disabled' ) );
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
                .RADIO_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
