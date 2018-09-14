/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';
import { Tooltip } from 'nessie-ui';

export default class IconWithTooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
        this.tooltip = wrapper.children( Tooltip ).first();
    }

    mouseOverIcon()
    {
        this.tooltip.driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.tooltip.driver().mouseOut();
        return this;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.tooltip.driver().getMessage();
    }
}
