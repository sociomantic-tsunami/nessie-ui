export default class TabsDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getTabButtons()
    {
        return this.wrapper.find( 'TabButton' );
    }

    changeActiveTab( index )
    {
        this.wrapper.find( 'TabButton' ).at( index );
        return this;
    }
}
