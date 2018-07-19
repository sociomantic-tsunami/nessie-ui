import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver'; // eslint-disable-line max-len

/**
 * This driver simulate actions on the content rather than on the tooltip
 * itself, as this is how a user would act.
 */
export default class TooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).first().children();
    }

    getMessage()
    {
        return this.wrapper.find( `.${this.cssMap.message}` ).first().children();
    }
}
