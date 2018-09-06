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
    TOOLTIP_ERR : ( event, state ) =>
        `Tooltip cannot simulate ${event} since it is ${state}`,
};

export default class TooltipDriver
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
            throw new Error( ERR
                .TOOLTIP_ERR( 'clickClose', 'not dismissable' ) );
        }

        this.wrapper.find( IconButton ).driver().click();
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
