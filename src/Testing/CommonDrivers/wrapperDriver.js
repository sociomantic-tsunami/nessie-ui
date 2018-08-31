export default class WrapperDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.prop( 'cssMap' );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.default}` )
            .first().children();
    }
}
