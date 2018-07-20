export default class RadioGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getContent()
    {
        const items = this.wrapper.find( 'li' );
        return items.map( item => item.childAt( 0 ) );
    }

    selectByIndex( index = 0 )
    {
        const items = this.getContent();
        items[ index ].driver().setChecked();
        return this;
    }

    selectByValue( value )
    {
        const item = this.wrapper.findWhere( n =>
            n.prop( 'value' ) === value ).first();
        item.driver().setChecked();
        return this;
    }

    toggleByIndex( index = 0 )
    {
        const items = this.getContent();
        items[ index ].driver().toggleChecked();
        return this;
    }

    toggleByValue( value )
    {
        const item = this.wrapper.findWhere( n =>
            n.prop( 'value' ) === value ).first();
        item.driver().toggleChecked();
        return this;
    }

    getSelectedValues()
    {
        const items =
            this.wrapper.findWhere( n => n.node.checked === true );

        return items.map( item => item.prop( 'value' ) );
    }
}
