export default class RadioGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper  = wrapper;
        this.listItem = wrapper.find( 'CheckableGroup' ).props()
            .cssMap.listItem;
        this.control = this.wrapper.find( 'input' ).first();
    }

    getContent()
    {
        const items = this.wrapper.find( `.${this.listItem}` );
        return items.map( item => item.childAt( 0 ) );
    }

    selectByIndex( index = 0 )
    {
        const items = this.getContent();
        items[ index ].driver().change();
        return this;
    }

    selectByValue( value )
    {
        const item = this.wrapper.findWhere( n =>
            n.prop( 'value' ) === value ).first();
        item.driver().change();
        return this;
    }

    getSelectedValues()
    {
        const items =
            this.wrapper.findWhere( n => n.node.checked === true );

        return items.map( item => item.prop( 'value' ) );
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
