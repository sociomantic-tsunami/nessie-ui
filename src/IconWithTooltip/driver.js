export default class IconWithTooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
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

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.tooltip.driver().getMessage();
    }
}
