// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

export default class IconWithTooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, 'IconWithTooltip > Tooltip' );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.control.driver().getMessage();
    }

    mouseOver()
    {
        this.control.driver().mouseOver();
        return this;
    }

    mouseOut()
    {
        this.control.driver().mouseOut();
        return this;
    }
}
