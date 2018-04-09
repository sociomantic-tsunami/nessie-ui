export default class ScrollBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickScrollUp()
    {
        this.wrapper.find( '.scrollBox__icon__up' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollRight()
    {
        this.wrapper.find( '.scrollBox__icon__right' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollDown()
    {
        this.wrapper.find( '.scrollBox__icon__down' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollLeft()
    {
        this.wrapper.find( '.scrollBox__icon__left' ).first()
            .simulate( 'click' );
        return this;
    }

    getContentWidth()
    {
        return this.wrapper.props().contentWidth;
    }

    setContentWidth( width )
    {
        const newValue = ( width == null ) ? '' : String( width );

        return this.wrapper.setProps( {
            contentWidth : newValue
        } );
    }

    getHeight()
    {
        return this.wrapper.props().height;
    }

    setHeight( height )
    {
        const newValue = ( height == null ) ? '' : String( height );

        return this.wrapper.setProps( {
            height : newValue
        } );
    }
}
