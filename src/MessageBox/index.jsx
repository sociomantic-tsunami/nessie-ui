import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

export default class MessageBox extends Component
{
    static propTypes =
    {
        /**
        *  Message text
        */
        message     : PropTypes.string,
        /**
        *  Message type
        */
        messageType : PropTypes.oneOf( [ 'alert', 'info', 'error', 'success' ] )
    }

    static defaultProps =
    {
        messageType : 'info',
        cssMap      : require( './messageBox.css' )
    };

    render()
    {
        const { cssMap, className, children, message,
                messageType } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { type: messageType } }>
                <div className = { className }>
                    { ( children || message ) &&
                        <Text>{ message }</Text>
                    }
                </div>
            </Css>
        );
    }
}
