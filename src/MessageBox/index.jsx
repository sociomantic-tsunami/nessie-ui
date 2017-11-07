import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

const MessageBox = ( {
    cssMap,
    className,
    children,
    message,
    messageType
} ) =>
{
    const messageNode = <Text>{ message }</Text>;

    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { type: messageType } }>
            <div className = { className }>
                { children || messageNode }
            </div>
        </Css>
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
    messageType : PropTypes.oneOf( [ 'alert', 'info', 'error', 'success' ] )
};

MessageBox.defaultProps =
{
    messageType : 'info',
    cssMap      : require( './messageBox.css' )
};

export default MessageBox;
