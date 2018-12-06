/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton } from '../index';

const ERR = {
    NOTIFICATION_NOT_DISMISSIBLE : 'NotificationBar is not dismissible',
};

export default class NotificationBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    clickClose()
    {
        if ( !this.wrapper.props().isDismissible )
        {
            throw new Error( ERR.NOTIFICATION_NOT_DISMISSIBLE );
        }

        this.wrapper.find( IconButton ).driver().click();
    }
}
