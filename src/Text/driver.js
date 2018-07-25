export default class TextDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
    }
}
