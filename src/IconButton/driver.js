const ERR = {
    ICONBUTTON_ERR : ( label, event, state ) =>
        `Button '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class IconButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
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

        this.wrapper.simulate( 'click' );
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
                .ICONBUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
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

        this.wrapper.simulate( 'focus' );
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

        this.wrapper.simulate( 'blur' );
        return this;
    }
}
