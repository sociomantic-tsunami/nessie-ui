const ERR = {
    ICONWITHTOOLTIP_ERR : ( event ) =>
        `IconWithTooltip cannot simulate ${event} because it is disabled`,
};

export default class IconWithTooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.tooltip = wrapper
            .find( `.${this.wrapper.props().cssMap.iconWithTooltip}` ).first();
    }

    mouseOverIcon()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'mouseOverIcon' ) );
        }

        this.tooltip.simulate( 'mouseenter' );
        return this;
    }

    mouseOutIcon()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'mouseOutIcon' ) );
        }

        this.tooltip.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'mouseOver' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'mouseOut' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
