import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';

import Text                 from '../Text';

const MessageBox = ( {
    cssMap,
    className,
    children,
    message,
    messageType,
} ) =>
{
    const messageNode = <Text className = { cssMap.text } >{ message }</Text>;

    return (
        <div className = { buildClassName( className, cssMap, { type: messageType } ) }>
            { children || messageNode }
        </div>
    );
};


MessageBox.propTypes =
{
    /**
    *  Message text
    */
    message     : PropTypes.string,
    /**
    *  Message type
    */
    messageType : PropTypes.oneOf( [
        'default',
        'alert',
        'info',
        'error',
        'success',
    ] )
};

MessageBox.defaultProps =
{
    messageType : 'default',
    cssMap      : require( './messageBox.css' )
};

export default MessageBox;
