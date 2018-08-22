const ERR = {
    FIELDSET_ERR : ( doWhat ) =>
        `Fieldset cannot ${doWhat} because it is disabled`,
};

export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.FIELDSET_ERR( 'onMouseOver' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.FIELDSET_ERR( 'onMouseOut' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
