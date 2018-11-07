// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

const ERR = {
    NOTIFICATION_NOT_DISMISSIBLE : 'The NotificationBar is not dismissible'
};

export default class NotificationBarDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
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
