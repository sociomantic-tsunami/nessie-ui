export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        option.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        option.simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        option.simulate( 'mouseleave' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }
}
