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

        if ( Array.isArray( index ) )
        {
            index.forEach( i =>
            {
                items[ i ].driver().setChecked();
            } );
        }
        else
        {
            items[ index ].driver().setChecked();
        }

        return this;
    }

    selectByValue( value )
    {
        if ( Array.isArray( value ) )
        {
            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'value' ) === i ).first();
                item.driver().setChecked();
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'value' ) === value ).first();
            item.driver().setChecked();
        }

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
        this.outer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.outer.simulate( 'mouseleave' );
        return this;
    }
}
