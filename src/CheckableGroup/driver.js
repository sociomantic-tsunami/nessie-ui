export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
        this.outer   = wrapper.find( `.${wrapper.props().cssMap.default}` );
    }

    getContent()
    {
        const items = this.wrapper.find( `.${this.cssMap.listItem}` );
        return items.map( item => item.childAt( 0 ) );
    }

    selectByIndex( index )
    {
        const items = this.getContent();
        items[ index ].driver().setChecked();
        return this;
    }

    selectByValue( value )
    {
        const item =
            this.wrapper.findWhere( n => n.prop( 'value' ) === value ).first();

        item.driver().setChecked();
        return this;
    }

    getSelectedValues()
    {
        const items =
            this.wrapper.findWhere( n => n.prop( 'checked' ) === true );

        return items.map( item => item.prop( 'value' ) );
    }

    mouseOver()
    {
        this.outer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.outer.simulate( 'mouseleave' );
        return this;
    }
}
