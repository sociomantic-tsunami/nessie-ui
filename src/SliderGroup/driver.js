/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Slider } from '../index';

export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    change(  val, index = 0  )
    {
        this.wrapper.find( Slider ).driver().change( val, index );
        return this;
    }
}
