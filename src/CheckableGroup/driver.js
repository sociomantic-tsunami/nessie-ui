export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }


    toggleByIndex( index = 0 )
    {
        const items = this.wrapper.find( `.${this.cssMap.listItem}` )
            .map( item => item.childAt( 0 ) );

        if ( Array.isArray( index ) )
        {
            index.forEach( i =>
            {
                items[ i ].driver().change();
            } );
        }
        else
        {
            items[ index ].driver().change();
        }

        return this;
    }

    toggleByValue( value )
    {
        if ( Array.isArray( value ) )
        {
            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'value' ) === i ).first();
                item.driver().change();
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'value' ) === value ).first();
            item.driver().change();
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
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
