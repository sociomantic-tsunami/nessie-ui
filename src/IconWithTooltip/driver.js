const ERR = {
    ICONWITHTOOLTIP_ERR : ( onEvent ) =>
        `IconWithTooltip cannot ${onEvent} because it is disabled`,
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
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'onMouseOverIcon' ) );
        }

        this.tooltip.simulate( 'mouseenter' );
        return this;
    }

    mouseOutIcon()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'onMouseOutIcon' ) );
        }

        this.tooltip.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'onMouseOver' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICONWITHTOOLTIP_ERR( 'onMouseOut' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
