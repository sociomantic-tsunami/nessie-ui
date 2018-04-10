export default class TagDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickClose()
    {
        this.wrapper.find( '.tag__delete' ).first().simulate( 'click' );
        return this;
    }
}
