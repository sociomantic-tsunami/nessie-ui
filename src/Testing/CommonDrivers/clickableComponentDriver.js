/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import SimpleComponentDriver from './simpleComponentDriver';

export default class ClickableComponentDriver extends SimpleComponentDriver
{
    click()
    {
        this.control.simulate( 'click' );
        return this;
    }
}
