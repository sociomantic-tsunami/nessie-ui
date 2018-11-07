import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import Icon                 from '../Icon';
import Text                 from '../Text';
import IconButton           from '../IconButton';

const NotificationBar = ( {
    children,
    className,
    cssMap,
    isDismissible,
    isFixed,
    message,
    messageType,
    onClickClose,
} ) =>
    (
        <div
            className = { buildClassName( className, cssMap, {
                top  : isFixed,
                type : messageType,
            } ) }>
            <Icon
                className = { cssMap.icon }
                type      = "info" />
            { ( children || message ) &&
                <Text className = { cssMap.message }>
                    { children || message }
                </Text>
            }
            { isDismissible &&
                <IconButton
                    className = { cssMap.close }
                    iconType  = "close"
                    onClick   = { onClickClose }
                    role      = "inverted" />
            }
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
        'error',
        'info',
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
    cssMap        : require( './notificationBar.css' ),
    isDismissible : true,
    isFixed       : false,
    messageType   : 'info',
};

export default NotificationBar;
