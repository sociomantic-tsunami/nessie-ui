import { Tooltip } from 'nessie-ui';

import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';


export default class IconWithTooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
    }

    mouseOverIcon()
    {
        this.wrapper.find( Tooltip ).first().driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.wrapper.find( Tooltip ).first().driver().mouseOut();
        return this;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.wrapper.find( `.${this.cssMap.iconWithTooltip}` ).first()
            .driver().getMessage();
    }
}
