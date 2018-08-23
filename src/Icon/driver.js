const ERR = {
    ICON_ERR : ( event ) =>
        `Icon cannot simulate ${event} because it is disabled`,
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
            throw new Error( ERR.ICON_ERR( 'mouseOver' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.ICON_ERR( 'mouseOut' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
