import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';


export default class TooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.wrapper.find( `.${this.cssMap.message}` ).children();
    }
}
