const ERR = {
    NOTIFICATION_NOT_DISMISSIBLE : 'The NotificationBar is not dismissible'
};

export default class NotificationBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    clickClose()
    {
        if ( !this.wrapper.props().isDismissible )
        {
            throw new Error( ERR.NOTIFICATION_NOT_DISMISSIBLE );
        }

        this.wrapper.find( `.${this.cssMap.close}` ).simulate( 'click' );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.message}` ).children();
    }
}
