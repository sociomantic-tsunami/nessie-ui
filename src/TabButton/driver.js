const ERRORS = {
    CANNOT_BE_CLICKED : () => 'Button cannot be clicked because it is disabled'
};

export default class TabButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error(
                ERRORS.CANNOT_BE_CLICKED()
            );
        }

        return this.wrapper.simulate( 'click' );
    }
}
