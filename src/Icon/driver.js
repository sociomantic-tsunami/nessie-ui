const ERR = {
    ICON_ERR : ( onEvent ) =>
        `Icon cannot ${onEvent} because it is disabled`,
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
            throw new Error( ERR.ICON_ERR( 'onMouseOver' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICON_ERR( 'onMouseOut' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
