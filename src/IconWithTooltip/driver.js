export default class IconWithTooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.tooltip = wrapper.find( 'IconWithTooltip > Tooltip' ).first();
    }

    mouseOverIcon()
    {
        this.tooltip.simulate( 'mouseenter' );
        return this;
    }

    mouseOutIcon()
    {
        this.tooltip.simulate( 'mouseleave' );
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
