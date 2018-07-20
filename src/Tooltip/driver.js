/**
 * This driver simulate actions on the content rather than on the tooltip
 * itself, as this is how a user would act.
 */
export default class TooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
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
