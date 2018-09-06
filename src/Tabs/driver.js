/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { TabButton } from '../index';

export default class TabsDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    change( index = 0 )
    {
        this.wrapper.find( TabButton ).at( index ).driver().click();
        return this;
    }
}
