import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';

export default class IconWithTooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
        this.tooltip = wrapper.find( 'IconWithTooltip > Tooltip' ).first();
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
