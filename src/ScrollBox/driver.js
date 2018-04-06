export default class ScrollBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        this.wrapper.find( 'IconButton' ).first().simulate( 'click' );
        return this;
    }
}
