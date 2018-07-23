import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class TagInputDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper );
        this.wrapper = wrapper;
    }

    clickCloseTagByIndex( index = 0 )
    {

        this.wrapper.find( 'Tag' ).at( index ).driver().clickClose();
        return this;
    }

    clickCloseTagByLabel( label )
    {
        if ( Array.isArray( label ) )
        {
            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'label' ) === i ).first();
                item.driver().clickClose();
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'label' ) === label ).first();
            item.driver().clickClose();
        }

        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }
}
