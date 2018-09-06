/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

const ERR = {
    NOTIFICATION_NOT_DISMISSIBLE : 'The NotificationBar is not dismissible'
};

export default class NotificationBarDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
    }

    clickClose()
    {
        if ( !this.wrapper.prop( 'isDismissible' ) )
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
