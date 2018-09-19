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
        this.cssMap  = wrapper.prop( 'cssMap' );
    }

    submit()
    {
        this.wrapper.simulate( 'submit' );
        return this.wrapper;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.default}` ).children();
    }
}
