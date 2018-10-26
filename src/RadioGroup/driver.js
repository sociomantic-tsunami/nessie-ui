/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { CheckableGroup } from 'nessie-ui';

export default class RadioGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.props().cssMap;
        this.checkables = wrapper.find( CheckableGroup );
    }


    change( index = 0 )
    {
        this.checkables.driver().change( index );
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
