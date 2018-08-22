const ERRORS = {
    CANNOT_MOUSEOVER : () =>
        'Cannot mouseOver because it is disabled',
    CANNOT_MOUSEOUT : () =>
        'Cannot mouseOut because it is disabled',
};

export default class IconDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS.CANNOT_MOUSEOVER() );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERRORS.CANNOT_MOUSEOUT() );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
