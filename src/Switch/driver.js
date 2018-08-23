const ERR = {
    SWITCH_ERR : ( onEvent, state ) =>
        `Switch cannot ${onEvent} since it is ${state}`,
};

export default class SwitchDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
        this.input = wrapper.find( `.${wrapper.props().cssMap.input}` );
    }

    change()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'onChange', 'read only' ) );
        }

        const node = this.input.getNode();

        node.checked = !node.checked;
        this.input.simulate( 'change' );

        return this.wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'onBlur', 'read only' ) );
        }

        this.input.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'onFocus', 'read only' ) );
        }

        this.input.simulate( 'focus' );
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
