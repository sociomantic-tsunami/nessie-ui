export default class WrapperDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.default}` )
            .first().children();
    }
}
