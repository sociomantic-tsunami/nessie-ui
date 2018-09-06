export default class SectionDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }
}
