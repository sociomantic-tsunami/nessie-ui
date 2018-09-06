const ERRORS = {
    OPTION_CANNOT_BE_CLICKED : () => 'Option cannot be clicked since it\'s disabled', // eslint-disable-line max-len
};

export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get options()
    {
        return this.wrapper.findWhere( node => node.prop( 'role' )=== 'option' );
    }

    clickOption( index = 0 )
    {
        const option = this.options.at( index );

        if ( option.prop( 'isDisabled' ) )
        {
            throw new Error(
                ERRORS.OPTION_CANNOT_BE_CLICKED()
            );
        }

        option.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        this.options.at( index ).simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.options.at( index ).simulate( 'mouseleave' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress' );
        return this;
    }
}
