const ERR = {
    RADIO_ERR : ( label, event, state ) =>
        `Radio '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class RadioDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( `.${this.wrapper.props().cssMap.input}` );
    }

    blur()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'blur', 'read only' ) );
        }

        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'focus', 'read only' ) );
        }

        this.control.simulate( 'focus' );
        return this;
    }

    change()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();
        const node  = this.control.getNode();

        if ( props.isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'change', 'read only' ) );
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
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'click', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'click', 'read only' ) );
        }

        this.control.simulate( 'click' );
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
