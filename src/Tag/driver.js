/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton } from 'nessie-ui';

export default class TagDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickClose()
    {
        this.wrapper.find( IconButton ).first().driver().click();
        return this;
    }
}
