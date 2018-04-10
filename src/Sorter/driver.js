export default class SorterDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle()
    {
        this.wrapper.find( '.sorter__sorter' ).simulate( 'click' );
        return this;
    }
}
