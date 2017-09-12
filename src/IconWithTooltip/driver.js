// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

export default class IconWithTooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, 'IconWithTooltip > Tooltip' );
        this.tooltip = this.control;
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
