export default class PaginatorDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.prop( 'cssMap' );
    }

    clickPrev()
    {
        this.wrapper.find( `.${this.cssMap.arrow}` )
            .first().simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.wrapper.find( `.${this.cssMap.arrow}` )
            .last().simulate( 'click' );
        return this;
    }

    clickPage( i = 0 )
    {
        this.wrapper.find( `.${this.cssMap.pageButton}` )
            .at( i ).simulate( 'click' );
        return this;
    }
}
