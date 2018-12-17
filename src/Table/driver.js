/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { TableCell } from 'nessie-ui';

export default class TableDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle( index = 0 )
    {
        this.wrapper.find( TableCell ).at( index ).driver().toggle();
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
