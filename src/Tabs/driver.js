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

    getTabButtonsByIndex( index )
    {
        return this.wrapper.find( 'TabButton' ).at( index );
    }

    getTabButtonsByLabel( label )
    {
        return this.wrapper.findWhere( n =>
            n.prop( 'label' ) === label ).first();
    }
}
