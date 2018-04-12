export default class TagDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickClose()
    {
        this.wrapper.find( 'IconButton' ).first().driver().click();
        return this;
    }
}
