/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
        <div
            className = { buildClassName( className, cssMap, {
                type : messageType,
            } ) }>
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
    ] ),
};

MessageBox.defaultProps =
{
    messageType : 'default',
};

MessageBox.displayName = 'MessageBox';

export default MessageBox;
