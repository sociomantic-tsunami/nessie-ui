export default class PaginatorDriver
{
    constructor( wrapper )
    {
        this.wrapper     = wrapper;
        this.cssMap      = wrapper.props().cssMap;
        this.shownPages  = wrapper.props().shownPages;
        this.prev        = wrapper.childAt( 0 );
        this.next        = wrapper.find( 'button' ).at( 3 );
    }

    getShownPages()
    {
        const items = this.wrapper.find( 'Text div' ).children();
        return items.map( item => parseInt( item.node.value, 10 ) );
    }

    setShownPages( value )
    {
        return this.wrapper.setProps( {
            shownPages : value
        } );
    }

    clickPrev()
    {
        this.prev.simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.next.simulate( 'click' );
        return this;
    }
}
