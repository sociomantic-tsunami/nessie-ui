import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Icon                 from '../Icon';
import Text                 from '../Text';
import IconButton           from '../IconButton';

export default class NotificationBar extends Component
{
    static propTypes =
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
            'success'
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
        isFixed       : PropTypes.bool

    }

    static defaultProps =
    {
        messageType   : 'info',
        isDismissible : true,
        isFixed       : false,
        cssMap        : require( './notificationBar.css' )
    };

    render()
    {
        const { cssMap, className, children, message, messageType,
                onClickClose, isDismissible, isFixed } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { type : messageType,
                    top  : isFixed } }>

                <div className  = { className }>

                    <Icon
                        className  = { cssMap.info }
                        type       = "info"
                        theme      = "button" />

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
            </Css>
        );
    }
}
