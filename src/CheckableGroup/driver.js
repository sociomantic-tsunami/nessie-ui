export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    selectByIndex( index )
    {
        const items = this.wrapper.find( `.${this.cssMap.listItem}` );
        return items.at( index ).childAt( 0 ).driver().setChecked();
    }
}
