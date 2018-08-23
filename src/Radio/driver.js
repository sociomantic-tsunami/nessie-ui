const ERR = {
    RADIO_ERR : ( label, onEvent, state ) =>
        `Radio '${label}' cannot ${onEvent} since it is ${state}`,
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
            throw new Error( ERR.RADIO_ERR( label, 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'onBlur', 'read only' ) );
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
            throw new Error( ERR.RADIO_ERR( label, 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'onFocus', 'read only' ) );
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
            throw new Error( ERR.RADIO_ERR( label, 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'onChange', 'read only' ) );
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
            throw new Error( ERR.RADIO_ERR( label, 'onClick', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'onClick', 'read only' ) );
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
                .RADIO_ERR( label, 'onMouseOver', 'disabled' ) );
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
                .RADIO_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
