export default class TabsDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    change( index = 0 )
    {
        this.wrapper.find( 'TabButton' ).at( index ).driver().click();
        return this;
    }
}
