export default class PaginatorDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
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

    getStartPage()
    {
        return this.wrapper.props().startPages;
    }

    setStartPage( value )
    {
        return this.wrapper.setProps( {
            startPages : value
        } );
    }

    getEndPage()
    {
        return this.wrapper.props().endPages;
    }

    setEndPages( value )
    {
        return this.wrapper.setProps( {
            endPages : value
        } );
    }

    clickPrev()
    {
        this.wrapper.find( `.${this.cssMap.arrows}` )
            .first().simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.wrapper.find( `.${this.cssMap.arrows}` )
            .last().simulate( 'click' );
        return this;
    }

    clickPage( i )
    {
        this.wrapper.find( `.${this.cssMap.pageButton}` )
            .at( i ).simulate( 'click' );
        return this;
    }
}
