const ERR = {
    TOGGLEBUTTON_ERR : ( label, event, state ) =>
        `ToggleButton '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class ToggleButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.button  = wrapper
            .find( `.${this.wrapper.props().cssMap.default}` ).first();
    }

    focus()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.title}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'focus', 'disabled' ) );
        }

        this.button.simulate( 'focus' );
        return this;
    }

    blur()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.title}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'blur', 'disabled' ) );
        }

        this.button.simulate( 'blur' );
        return this;
    }

    click()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.title}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'click', 'disabled' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.title}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.button.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.title}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .TOGGLEBUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.button.simulate( 'mouseleave' );
        return this;
    }
}
