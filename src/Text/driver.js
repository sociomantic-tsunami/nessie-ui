export default class TextDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
    }

    getContent()
    {
        if ( this.wrapper.prop( 'children' ) )
        {
            return this.wrapper.find( `.${this.cssMap.default}` ).children();
        }

        return this.wrapper.find( `.${this.cssMap.default}` ).text();
    }
}
