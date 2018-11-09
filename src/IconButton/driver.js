const ERR = {
    ICONBUTTON_ERR : ( label, event, state ) =>
        `Button '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class IconButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.button  = wrapper
            .find( `.${this.wrapper.props().cssMap.default}` ).first();
    }

    click()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'click', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'click', 'read only' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.button.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.button.simulate( 'mouseleave' );
        return this;
    }

    focus()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.ICONBUTTON_ERR( label, 'focus', 'disabled' ) );
        }

        this.button.simulate( 'focus' );
        return this;
    }

    blur()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.ICONBUTTON_ERR( label, 'blur', 'disabled' ) );
        }

        this.button.simulate( 'blur' );
        return this;
    }
}
