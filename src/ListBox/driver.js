const ERRORS = {
    OPTION_CANNOT_BE_CLICKED : () =>
        'Option cannot be clicked since it\'s disabled',
};

export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get options()
    {
        return this.wrapper.findWhere( node => node.props().role === 'option' );
    }

    clickOption( index = 0 )
    {
        const option = this.options.at( index );

        if ( option.props().isDisabled )
        {
            throw new Error( ERRORS.OPTION_CANNOT_BE_CLICKED() );
        }

        option.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error( ERRORS.OPTION_CANNOT_BE_CLICKED() );
        }

        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error( ERRORS.OPTION_CANNOT_BE_CLICKED() );
        }

        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseleave' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }
}
