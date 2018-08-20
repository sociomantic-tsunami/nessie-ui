import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import Icon                 from '../Icon';
import Text                 from '../Text';
import IconButton           from '../IconButton';

const NotificationBar = ( {
    cssMap,
    className,
    children,
    message,
    messageType,
    onClickClose,
    isDismissible,
    isFixed,
} ) =>
    (
        <div
            className  = { buildClassName( className, cssMap, {
                type : messageType,
                top  : isFixed,
            } ) }>

            <Icon
                className  = { cssMap.info }
                type       = "info" />

            { ( children || message ) &&
                <Text className = { cssMap.message }>
                    { children || message }
                </Text>

            }

            { isDismissible && <IconButton
                className  = { cssMap.close }
                iconType   = "close"
                iconTheme  = "button"
                onClick    = { onClickClose } />}
        </div>
    );

NotificationBar.propTypes =
{
    /**
    *  Message text
    */
    message     : PropTypes.string,
    /**
     *  NotificationBar content
     */
    children    : PropTypes.node,
    /**
    *  Message type
    */
    messageType : PropTypes.oneOf( [
        'alert',
        'info',
        'error',
        'success',
    ] ),
    /**
     *  Close button onClick callback function
     */
    onClickClose  : PropTypes.func,
    /**
    *  Message text
    */
    isDismissible : PropTypes.bool,
    /**
    *  Change position to fixed top in the viewport
    */
    isFixed       : PropTypes.bool,
};

NotificationBar.defaultProps =
{
    messageType   : 'info',
    isDismissible : true,
    isFixed       : false,
    cssMap        : require( './notificationBar.css' ),
};

export default NotificationBar;
