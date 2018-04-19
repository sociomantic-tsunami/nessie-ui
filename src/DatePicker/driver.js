export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    clickItem( index = 0 )
    {
        this.wrapper.find( '.datePickerItem__default' ).at( index )
            .simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.wrapper.find( '.datePickerHeader__next' )
            .simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        this.wrapper.find( '.datePickerHeader__prev' )
            .simulate( 'click' );
        return this;
    }
}
