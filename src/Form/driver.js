export default class FormDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
    }

    submit()
    {
        this.wrapper.simulate( 'submit' );
        return this.wrapper;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }
}
