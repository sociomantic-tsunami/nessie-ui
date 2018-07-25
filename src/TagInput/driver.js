export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickCloseTagByIndex( index = 0 )
    {
        this.wrapper.find( 'Tag' ).at( index )
            .find( `.${this.wrapper.prop( 'cssMap' ).delete}` )
            .simulate( 'click' );
        return this;
    }

    clickCloseTagByLabel( label )
    {
        if ( Array.isArray( label ) )
        {
            let value;

            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'label' ) === i ).first();
                item.find( `.${this.wrapper.prop( 'cssMap' ).delete}` )
                    .simulate( 'click' );
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'label' ) === label ).first();
            item.find( `.${this.wrapper.prop( 'cssMap' ).delete}` )
                .simulate( 'click' );
        }

        return this;
    }
}
