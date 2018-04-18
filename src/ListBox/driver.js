const ERRORS = {
    OPTION_CANNOT_BE_CLICKED : () => `Option cannot be clicked since it's disabled`, // eslint-disable-line max-len
};

export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickOption( index = 0 )
    {
        const listBox = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( listBox.props().disabled )
        {
            throw new Error(
                ERRORS.OPTION_CANNOT_BE_CLICKED()
            );
        }

        listBox.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseleave' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress' );
        return this;
    }
}
