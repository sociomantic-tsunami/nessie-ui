/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class FormDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    submit()
    {
        this.wrapper.simulate( 'submit' );
        return this.wrapper;
    }
}
