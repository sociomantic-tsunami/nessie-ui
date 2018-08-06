export default class TableCellDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle()
    {
        this.wrapper.find( 'Sorter' ).driver().click();
        return this;
    }
}
