const ERRORS = {
    CANNOT_MOUSEOVER : () =>
        'Cannot mouseOver because it is disabled',
    CANNOT_MOUSEOUT : () =>
        'Cannot mouseOut because it is disabled',
    CANNOT_MOUSEOVER_ICON : () =>
        'Cannot mouseOverIcon because it is disabled',
    CANNOT_MOUSEOUT_ICON : () =>
        'Cannot mouseOutIcon because it is disabled',
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
            throw new Error( ERRORS.CANNOT_MOUSEOVER_ICON() );
        }

        this.tooltip.simulate( 'mouseenter' );
        return this;
    }

    mouseOutIcon()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS.CANNOT_MOUSEOUT_ICON() );
        }

        this.tooltip.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS.CANNOT_MOUSEOVER() );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS.CANNOT_MOUSEOUT() );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
